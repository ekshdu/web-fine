import psycopg2
import psycopg2.pool
import psycopg2.extras
from config import settings

pool = psycopg2.pool.SimpleConnectionPool(
    1, 10,
    host=settings.db_host, port=settings.db_port,
    user=settings.db_user, password=settings.db_password,
    dbname=settings.db_name,
)


def get_db():
    conn = pool.getconn()
    try:
        yield conn
    finally:
        pool.putconn(conn)


def get_connection():
    return pool.getconn()


def release_connection(conn):
    pool.putconn(conn)


def dict_cursor(conn):
    return conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)