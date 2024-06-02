from models.book import Book
from repository.book_repository import BookRepository
from schemas.book import BookCreate, BookUpdate

class BookService:
    @staticmethod
    def get_books():
        return BookRepository.get_all()

    @staticmethod
    def get_book(book_id: int):
        return BookRepository.get_by_id(book_id)

    @staticmethod
    def create_book(book_in: BookCreate):
        book = Book(id=0, title=book_in.title, status=book_in.status)
        return BookRepository.create(book)

    @staticmethod
    def update_book(book_id: int, book_in: BookUpdate):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None
        book.title = book_in.title
        book.status = book_in.status
        BookRepository.update(book_id, book)
        return book

    @staticmethod
    def delete_book(book_id: int):
        book = BookRepository.get_by_id(book_id)
        if not book:
            return None
        BookRepository.delete(book_id)
        return book
