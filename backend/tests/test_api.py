import pytest
import requests


BASE_URL = "http://localhost:8000"

@pytest.fixture
def create_book():
    
    response = requests.post(
        f"{BASE_URL}/api/v1/books/",
        json={"title": "Test Book", "status": "to_read"}
    )
    assert response.status_code == 200
    book_id = response.json()["id"]
    yield book_id  
    requests.delete(f"{BASE_URL}/api/v1/books/{book_id}")


def test_create_book():
    response = requests.post(
        f"{BASE_URL}/api/v1/books/",
        json={"title": "Test Book", "status": "to_read"}
    )
    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["title"] == "Test Book"
    assert response.json()["status"] == "to_read"

def test_get_books():
    response = requests.get(f"{BASE_URL}/api/v1/books/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_get_book(create_book):
    response = requests.get(f"{BASE_URL}/api/v1/books/{create_book}")
    assert response.status_code == 200
    assert "id" in response.json()
    assert "title" in response.json()
    assert "status" in response.json()

def test_update_book(create_book):
    response = requests.put(
        f"{BASE_URL}/api/v1/books/{create_book}",
        json={"title": "Updated Book", "status": "completed"}
    )

    assert response.status_code == 200
    assert "id" in response.json()
    assert response.json()["title"] == "Updated Book"
    assert response.json()["status"] == "completed"

def test_delete_book(create_book):
    response = requests.delete(f"{BASE_URL}/api/v1/books/{create_book}")
    assert response.status_code == 200
