from fastapi import APIRouter
from router.v1 import book

api_router = APIRouter()
api_router.include_router(book.router, prefix="/books", tags=["books"])
