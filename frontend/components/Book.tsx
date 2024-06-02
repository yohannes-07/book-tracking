"use client";

import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import EditBook from "./EditBook";
import { use, useState } from "react";
import { useDeleteBookMutation } from "@/store/features/book/book-api";

interface BookProps {
  id: number;
  title: string;
  status: string;
}


const Book = ({ id, title, status }: BookProps) => {
  const [open, setOpen] = useState(false);
  const [deleteBook, {isLoading, error} ] = useDeleteBookMutation(); 

  const handleDeleteBook = (id: number) => {
    deleteBook(id);
  }

  return (
    <div data-test="book-item" className="relative bg-white p-4 rounded shadow mt-1 border-b border-slate-300 max-w-2xl">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{title}</h3>

        <div className="flex gap-1 sm:gap-3">
          <Dialog
            open={open}
            onOpenChange={setOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                data-test="edit-book"
              >
                <Pencil2Icon className="w-5 h-5 text-blue-500" />
              </Button>
            </DialogTrigger>

            <EditBook
              id={id}
              title={title}
              status={status}
              open={open}
              setOpen={setOpen}
            />
          </Dialog>

          <Button
            variant="ghost"
            size="icon"
            data-test="delete-book"
            onClick={() => handleDeleteBook(id)}
          >
            <TrashIcon className="w-5 h-5 text-red-500" />
          </Button>
        </div>
      </div>

      <Badge
        className="my-2"
        variant={
          status === "to_read"
            ? "error"
            : status === "in_progress"
            ? "warning"
            : "success"
        }
      >
        {status === "to_read"
          ? "To Read"
          : status === "in_progress"
          ? "In Progress"
          : "Completed"}
      </Badge>

    </div>
  );
};

export default Book;
