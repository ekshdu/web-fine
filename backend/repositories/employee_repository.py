from psycopg2.extensions import connection as Connection
from db import dict_cursor
class EmployeeRepository:
    def __init__(self, conn: Connection):
        self.conn = conn
    def find_by_credentials(self, username: str, password: str) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(
            """
            SELECT e.*, u.username FROM emp_gibdd e
            JOIN user_emp u ON e.id_user = u.id
            WHERE u.username = %s AND u.password = %s
            """,
            (username, password),
        )
        row = cur.fetchone()
        cur.close()
        return row
