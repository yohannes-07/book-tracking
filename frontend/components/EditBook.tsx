import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/Select";
import { useEditBookMutation } from "@/store/features/book/book-api";

interface EditBookProps {
  id: number;
  title: string;
  status: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const EditBook = ({
  id,
  title,
  status,
  open,
  setOpen,
}: EditBookProps) => {

  const router = useRouter();
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newStatus, setNewStatus] = useState<string>(status);
  const [error, setError] = useState<string>();
  const [editBook, {isLoading} ] = useEditBookMutation(); 

  const handleEditedBook = (e: any) => {
    e.preventDefault();

    if (newTitle.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (!newStatus) {
      setError("Please select a status for the book");
    } else {
      const editedBook = {
        title: newTitle,
        status: newStatus,
      };

      editBook({id, ...editedBook});
        
      setNewTitle("");
      setNewStatus("");
      setError("");
      setOpen(!open);
      router.refresh();
    }
  };

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle className="text-xl">Edit Book</DialogTitle>
        <DialogDescription>
          Edit Your Progress here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleEditedBook}>
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
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Title"
              className="col-span-3"
              data-test="edit-book-title"
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
              value={newStatus}
              onValueChange={setNewStatus}
              data-test="edit-book-status"
            >
              <SelectTrigger  className="edit-book-status col-span-3">
                <SelectValue placeholder="Reading Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="select-edit-item" value="to_read">To Read</SelectItem>
                <SelectItem className="select-edit-item" value="in_progress">In Progress</SelectItem>
                <SelectItem className="select-edit-item" value="completed">Completed</SelectItem>
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
          <Button data-test="save-book" type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default EditBook;
