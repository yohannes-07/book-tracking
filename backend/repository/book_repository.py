
from models.book import Book
from config.db import PgDatabase

class BookRepository:
    @staticmethod
    def get_all():
        query = "SELECT * FROM books"
        with PgDatabase() as db:
            db.cursor.execute(query)
            rows = db.cursor.fetchall()
        return [Book(*row) for row in rows]

    @staticmethod
    def get_by_id(book_id: int):
        query = "SELECT * FROM books WHERE id = %s"
        with PgDatabase() as db:
            db.cursor.execute(query, (book_id,))
            row = db.cursor.fetchone()
        if row:
            return Book(*row)
        return None

    @staticmethod
    def create(book: Book):
        query = "INSERT INTO books (title, status) VALUES (%s, %s) RETURNING id"
        with PgDatabase() as db:
            db.cursor.execute(query, (book.title, book.status))
            book_id = db.cursor.fetchone()[0]
            db.connection.commit()
        book.id = book_id
        return book

    @staticmethod
    def update(book_id: int, book: Book):
        query = "UPDATE books SET title = %s, status = %s WHERE id = %s"
        with PgDatabase() as db:
            db.cursor.execute(query, (book.title, book.status, book_id))
            db.connection.commit()

    @staticmethod
    def delete(book_id: int):
        query = "DELETE FROM books WHERE id = %s"
        with PgDatabase() as db:
            db.cursor.execute(query, (book_id,))
            db.connection.commit()
