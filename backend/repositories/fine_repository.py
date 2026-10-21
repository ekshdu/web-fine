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
        cur.execute(self._select_base_query() + " WHERE tf.id_status_fine = 3 ORDER BY tf.date_time")
        rows = cur.fetchall()
        cur.close()
        return rows

    def get_all(self) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute(self._select_base_query() + " ORDER BY tf.date_time DESC")
        rows = cur.fetchall()
        cur.close()
        return rows

    def get_by_id(self, fine_id: int) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(self._select_base_query() + " WHERE tf.id = %s", (fine_id,))
        row = cur.fetchone()
        cur.close()
        return row

    def get_by_car_num(self, car_num: str) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute(
            self._select_base_query() + " WHERE c.car_num = %s ORDER BY tf.date_time DESC",
            (car_num,),
        )
        rows = cur.fetchall()
        cur.close()
        return rows

    def create(self, data: dict) -> dict:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id FROM car WHERE car_num = %s", (data["car_num"],))
        car_row = cur.fetchone()
        if not car_row:
            cur.close()
            raise ValueError("Автомобиль с таким госномером не найден")
        id_car = car_row["id"]

        cur.execute(
            """
            INSERT INTO traffic_fine
                (id_emp, id_car, id_fine_sum, id_status_fine, id_speed_fine,
                 id_fine_section, date_time, num_post, fine_place, actual_speed)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING id
            """,
            (
                data["id_emp"], id_car, data["id_fine_sum"], data["id_status_fine"],
                data["id_speed_fine"], data["id_fine_section"], data["date_time"],
                data["num_post"], data["fine_place"], data["actual_speed"],
            ),
        )
        new_id = cur.fetchone()["id"]
        self.conn.commit()
        cur.close()
        return self.get_by_id(new_id)

    def update(self, fine_id: int, data: dict) -> dict | None:
        fields = []
        values = []
        for column, value in data.items():
            if value is not None:
                fields.append(f"{column} = %s")
                values.append(value)

        if not fields:
            return self.get_by_id(fine_id)

        values.append(fine_id)
        cur = self.conn.cursor()
        cur.execute(f"UPDATE traffic_fine SET {', '.join(fields)} WHERE id = %s", tuple(values))
        self.conn.commit()
        cur.close()
        return self.get_by_id(fine_id)

    def delete(self, fine_id: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("DELETE FROM traffic_fine WHERE id = %s", (fine_id,))
        affected = cur.rowcount
        self.conn.commit()
        cur.close()
        return affected > 0

    def get_document_data(self, fine_id: int) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(
            """
            SELECT d.surname AS drv_surname, d.name AS drv_name,
                   d.middle_name AS drv_middle, d.place_of_birth AS drv_birth,
                   d.date_of_birth AS drv_dob, d.id_gender,
                   c.car_model, c.car_num,
                   tf.date_time, tf.num_post, tf.fine_place, fs.summary AS fine_sum,
                   tf.actual_speed, fsp.fine_speedcol AS fine_speed, fsec.section_num,
                   TRIM(CONCAT(e.surname, ' ', e.name, ' ', COALESCE(e.middle_name, ''))) AS emp_fio
            FROM traffic_fine tf
            JOIN car c ON tf.id_car = c.id
            JOIN driver d ON c.id_driver = d.id
            JOIN fine_sum fs ON tf.id_fine_sum = fs.id
            JOIN emp_gibdd e ON tf.id_emp = e.id
            LEFT JOIN fine_speed fsp ON tf.id_speed_fine = fsp.id
            LEFT JOIN fine_section fsec ON tf.id_fine_section = fsec.id
            WHERE tf.id = %s
            """,
            (fine_id,),
        )
        row = cur.fetchone()
        cur.close()
        return row

    def get_unpaid_by_period(self, date_from: str, date_to: str) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute(
            self._select_base_query()
            + " WHERE tf.date_time BETWEEN %s AND %s AND tf.id_status_fine IN (2, 3)"
            + " ORDER BY tf.date_time DESC",
            (f"{date_from} 00:00:00", f"{date_to} 23:59:59"),
        )
        rows = cur.fetchall()
        cur.close()
        return rows

    @staticmethod
    def _select_base_query() -> str:
        return """
            SELECT tf.id, tf.date_time, tf.num_post, tf.fine_place, tf.actual_speed,
                   tf.id_car, tf.id_emp,
                   d.name AS driver_name, d.surname AS driver_surname,
                   d.middle_name AS driver_middle_name,
                   c.car_num, c.car_model,
                   fs.summary AS fine_sum, tf.id_fine_sum,
                   sec.section_num, tf.id_fine_section,
                   sp.fine_speedcol AS fine_speed, tf.id_speed_fine,
                   st.name AS status_name, tf.id_status_fine,
                   e.name AS emp_name, e.surname AS emp_surname
            FROM traffic_fine tf
            JOIN car c ON tf.id_car = c.id
            JOIN driver d ON c.id_driver = d.id
            JOIN fine_sum fs ON tf.id_fine_sum = fs.id
            JOIN fine_section sec ON tf.id_fine_section = sec.id
            JOIN fine_speed sp ON tf.id_speed_fine = sp.id
            JOIN status_fine st ON tf.id_status_fine = st.id
            JOIN emp_gibdd e ON tf.id_emp = e.id
        """