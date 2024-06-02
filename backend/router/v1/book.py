from fastapi import APIRouter, HTTPException
from service.book_service import BookService
from schemas.book import BookCreate, BookUpdate, BookInDB

router = APIRouter()

@router.get("/", response_model=list[BookInDB])
async def read_books():
    return BookService.get_books()

@router.get("/{book_id}", response_model=BookInDB)
async def read_book(book_id: int):
    book = BookService.get_book(book_id)
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    return book

@router.post("/", response_model=BookInDB)
async def create_book(book: BookCreate):
    return BookService.create_book(book)

@router.put("/{book_id}", response_model=BookInDB)
async def update_book(book_id: int, book: BookUpdate):
    updated_book = BookService.update_book(book_id, book)
    if not updated_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return updated_book

@router.delete("/{book_id}", response_model=BookInDB)
async def delete_book(book_id: int):
    deleted_book = BookService.delete_book(book_id)
    if not deleted_book:
        raise HTTPException(status_code=404, detail="Book not found")
    return deleted_book
