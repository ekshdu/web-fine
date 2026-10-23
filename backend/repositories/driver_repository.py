from psycopg2.extensions import connection as Connection
from db import dict_cursor


class DriverRepository:
    def __init__(self, conn: Connection):
        self.conn = conn

    def find_by_plate(self, plate: str) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(
            """
            SELECT d.id AS driver_id, d.name, d.surname, d.middle_name,
                   d.place_of_birth, d.date_of_birth, d.id_gender,
                   c.id AS car_id, c.car_num, c.car_model
            FROM car c JOIN driver d ON c.id_driver = d.id
            WHERE c.car_num = %s
            """,
            (plate,),
        )
        row = cur.fetchone()
        cur.close()
        return row

    def gender_exists(self, gender_id: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("SELECT 1 FROM gender WHERE id = %s", (gender_id,))
        exists = cur.fetchone() is not None
        cur.close()
        return exists

    def plate_exists(self, plate: str) -> bool:
        cur = self.conn.cursor()
        cur.execute("SELECT 1 FROM car WHERE car_num = %s", (plate,))
        exists = cur.fetchone() is not None
        cur.close()
        return exists

    def create_with_car(self, data: dict) -> dict | None:
        cur = dict_cursor(self.conn)
        try:
            cur.execute(
                """
                INSERT INTO driver (name, surname, middle_name, place_of_birth, date_of_birth, id_gender)
                VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
                """,
                (data["name"], data["surname"], data["middle_name"], data["place_of_birth"],
                 data["date_of_birth"], data["id_gender"]),
            )
            driver_id = cur.fetchone()["id"]
            cur.execute(
                "INSERT INTO car (id_driver, car_num, car_model) VALUES (%s, %s, %s)",
                (driver_id, data["plate"], data["car_model"]),
            )
            self.conn.commit()
        except Exception:
            self.conn.rollback()
            raise
        finally:
            cur.close()
        return self.find_by_plate(data["plate"])