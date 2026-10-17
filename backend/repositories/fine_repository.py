from psycopg2.extensions import connection as Connection
from db import dict_cursor


class FineRepository:
    def __init__(self, conn: Connection):
        self.conn = conn

    def mark_overdue_fines(self, overdue_days: int) -> int:
        cur = self.conn.cursor()
        cur.execute(
            """
            UPDATE traffic_fine
            SET id_status_fine = 3
            WHERE id_status_fine = 2
              AND (NOW() - date_time) >= (%s || ' days')::interval
            """,
            (overdue_days,),
        )
        affected = cur.rowcount
        self.conn.commit()
        cur.close()
        return affected

    def get_overdue_fines(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute(
            """
            SELECT tf.id, tf.date_time, tf.num_post, tf.fine_place, tf.actual_speed,
                   d.name AS driver_name, d.surname AS driver_surname,
                   d.middle_name AS driver_middle_name,
                   c.car_num, c.car_model,
                   fs.summary AS fine_sum,
                   sec.section_num,
                   sp.fine_speed,
                   e.name AS emp_name, e.surname AS emp_surname
            FROM traffic_fine tf
            JOIN car c ON tf.id_car = c.id
            JOIN driver d ON c.id_driver = d.id
            JOIN fine_sum fs ON tf.id_fine_sum = fs.id
            JOIN fine_section sec ON tf.id_fine_section = sec.id
            JOIN fine_speed sp ON tf.id_speed_fine = sp.id
            JOIN emp_gibdd e ON tf.id_emp = e.id
            WHERE tf.id_status_fine = 3
            ORDER BY tf.date_time
            """
        )
        rows = cur.fetchall()
        cur.close()
        return rows