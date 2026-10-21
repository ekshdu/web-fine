from psycopg2.extensions import connection as Connection
from db import dict_cursor


class ReferenceRepository:
    def __init__(self, conn: Connection):
        self.conn = conn

    def get_statuses(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id, name FROM status_fine ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        return rows

    def get_fine_sums(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id, summary FROM fine_sum ORDER BY summary")
        rows = cur.fetchall()
        cur.close()
        return rows

    def get_fine_sections(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id, section_num FROM fine_section ORDER BY id")
        rows = cur.fetchall()
        cur.close()
        return rows

    def get_fine_speeds(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id, fine_speedcol AS fine_speed FROM fine_speed ORDER BY fine_speedcol")
        rows = cur.fetchall()
        cur.close()
        return rows 