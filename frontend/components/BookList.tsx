"use client";

import { useSearchParams } from "next/navigation";

import Book from "./Book";
import AddBook from "./AddBook";
import BookFilter from "./BookFilter";
import { useGetBooksQuery } from "@/store/features/book/book-api";
import { BookInterface } from "@/types/book";

const BookList = () => {

  const searchParams = useSearchParams();
  const booksFilter = searchParams.get("books");

  const { data: books } = useGetBooksQuery();
  let filteredBooks = books;

  if (booksFilter === "to_read") {
    filteredBooks = books?.filter((book:BookInterface) => book.status === "to_read");
  } else if (booksFilter === "in_progress") {
    filteredBooks = books?.filter(
      (book:BookInterface) => book.status === "in_progress"
    );
  } else if (booksFilter === "completed") {
    filteredBooks = books?.filter(
      (book:BookInterface) => book.status === "completed"
    );
  }

  return (
    <div className="">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 sm:mb-14">
        <h2 className="text-2xl font-semibold">
           {" "}
          {booksFilter === "to_read"
            ? "To Read"
            : booksFilter === "in_progress"
            ? "In Progress"
            : booksFilter === "completed"
            ? "Completed"
            : ""}{" "}
          Books
        </h2>
        <AddBook />
      </div>

      <BookFilter />

      <div className="flex flex-col gap-2 px-4 py-5 max-h-[600px] overflow-auto">
        {filteredBooks?.map((book: any) => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            status={book.status}
          />
        ))}
      </div>
    </div>
  );
};

export default BookList;
