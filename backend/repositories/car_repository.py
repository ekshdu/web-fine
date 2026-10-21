from psycopg2.extensions import connection as Connection
from db import dict_cursor


class CarRepository:
    def __init__(self, conn: Connection):
        self.conn = conn

    def get_cars_by_driver(self, driver_id: int) -> list[dict]:
        cur = dict_cursor(self.conn)
        cur.execute(
            "SELECT id, car_num, car_model, id_driver FROM car WHERE id_driver = %s ORDER BY id",
            (driver_id,),
        )
        rows = cur.fetchall()
        cur.close()
        return rows

    def find_by_id_and_driver(self, car_id: int, driver_id: int) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute(
            "SELECT id, car_num, car_model, id_driver FROM car WHERE id = %s AND id_driver = %s",
            (car_id, driver_id),
        )
        row = cur.fetchone()
        cur.close()
        return row

    def find_by_car_num(self, car_num: str) -> dict | None:
        cur = dict_cursor(self.conn)
        cur.execute("SELECT id, car_num, car_model, id_driver FROM car WHERE car_num = %s", (car_num,))
        row = cur.fetchone()
        cur.close()
        return row

    def has_fines(self, car_id: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("SELECT 1 FROM traffic_fine WHERE id_car = %s LIMIT 1", (car_id,))
        exists = cur.fetchone() is not None
        cur.close()
        return exists

    def create(self, driver_id: int, car_num: str, car_model: str | None) -> dict:
        cur = dict_cursor(self.conn)
        cur.execute(
            "INSERT INTO car (id_driver, car_num, car_model) VALUES (%s, %s, %s) RETURNING id",
            (driver_id, car_num, car_model),
        )
        new_id = cur.fetchone()["id"]
        self.conn.commit()
        cur.close()
        return self.find_by_id_and_driver(new_id, driver_id)

    def delete(self, car_id: int) -> bool:
        cur = self.conn.cursor()
        cur.execute("DELETE FROM car WHERE id = %s", (car_id,))
        affected = cur.rowcount
        self.conn.commit()
        cur.close()
        return affected > 0