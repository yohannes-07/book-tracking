from pydantic import BaseModel

class BookCreate(BaseModel):
    title: str
    status: str

class BookUpdate(BaseModel):
    title: str
    status: str

class BookInDB(BaseModel):
    id: int
    title: str
    status: str

    class Config:
        orm_mode = True
