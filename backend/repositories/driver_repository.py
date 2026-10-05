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
