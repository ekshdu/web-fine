import psycopg2
import psycopg2.pool
import psycopg2.extras
DB_CONFIG = dict(
    host="127.0.0.1",
    port=5432,
    user="postgres",
    password="1",
    dbname="fine",
)
pool = psycopg2.pool.SimpleConnectionPool(1, 10, **DB_CONFIG)
def get_db():
    conn = pool.getconn()
    try:
        yield conn
    finally:
        pool.putconn(conn)
def dict_cursor(conn):
    return conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
