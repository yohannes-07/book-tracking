"use client";

import { useState } from "react";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useAddBookMutation } from "@/store/features/book/book-api";

const AddBook = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [status, setStatus] = useState<string>("to_read");
  const [error, setError] = useState<string>();
  const [addBook, {isLoading} ] = useAddBookMutation(); 


  const handleNewBook = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (!status) {
      setError("Please select a status for the book");
    } else {
      const newBook = {
        title,
        status,
      };

      addBook(newBook);
        
      setTitle("");
      setStatus("");
      setError("");
      setOpen(!open);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button data-test="add-book" variant="default">Add New Book</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Book</DialogTitle>
          <DialogDescription>
            Add a new Book to your Book Tracking App. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewBook}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="name"
                className="text-left"
              >
                Title
              </Label>
              <Input
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="col-span-3"
                data-test='new-book-title'
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-2">
              <Label
                htmlFor="status"
                className="text-left"
              >
                Status
              </Label>
              <Select
                value={status}
                onValueChange={setStatus}
              >
                <SelectTrigger className="new-book-status col-span-3">
                  <SelectValue placeholder="Reading Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="select-item" value="to_read">To Read</SelectItem>
                  <SelectItem className="select-item" value="in_progress">In Progress</SelectItem>
                  <SelectItem className="select-item" value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {error && (
              <p className="text-center py-1 rounded bg-error-background text-error-foreground">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button data-test="save-book" type="submit">Save Book</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
