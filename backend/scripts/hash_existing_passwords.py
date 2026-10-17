import sys
import os

sys.path.append(os.path.join(os.path.dirname(__file__), "..", "app"))

import psycopg2
import psycopg2.extras
from security import hash_password
from config import settings


def main():
    conn = psycopg2.connect(
        host=settings.db_host, port=settings.db_port,
        user=settings.db_user, password=settings.db_password,
        dbname=settings.db_name,
    )
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT id, username, password FROM user_emp")
    users = cur.fetchall()

    updated = 0
    for user in users:
        current = user["password"]
        if current.startswith("$2b$") or current.startswith("$2a$") or current.startswith("$2y$"):
            continue
        new_hash = hash_password(current)
        cur.execute("UPDATE user_emp SET password = %s WHERE id = %s", (new_hash, user["id"]))
        updated += 1

    conn.commit()
    cur.close()
    conn.close()
    print(f"Обновлено паролей: {updated}")


if __name__ == "__main__":
    main()