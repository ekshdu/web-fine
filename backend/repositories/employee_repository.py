from psycopg2.extensions import connection as Connection
from db import dict_cursor


class EmployeeRepository:
    def __init__(self, conn: Connection):
        self.conn = conn

    def find_by_username(self, username: str) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(
            """
            SELECT e.id, e.name, e.surname, e.middle_name, e.phone_number,
                   u.username, u.password AS password_hash
            FROM emp_gibdd e
            JOIN user_emp u ON e.id_user = u.id
            WHERE u.username = %s
            """,
            (username,),
        )
        row = cur.fetchone()
        cur.close()
        return row