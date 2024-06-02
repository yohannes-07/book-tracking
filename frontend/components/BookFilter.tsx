import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface BookFilterProps {}

const BookFilter = ({}: BookFilterProps) => {
  const searchParams = useSearchParams();
  const booksFilter = searchParams.get("books");

  return (
    <div className="mb-4">
      <ul className="flex flex-wrap gap-1 sm:gap-4 justify-center text-sm sm:text-base font-medium text-center text-slate-500 border-b border-slate-200 ">
        <Link
          href="/"
          className={`${
            booksFilter === null && "bg-emerald-200 text-slate-900 "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          All
        </Link>

        <Link
          href="/?books=to_read"
          className={`${
            booksFilter === "to_read" && "bg-emerald-200 text-slate-900 "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          To Read
        </Link>

        <Link
          href="/?books=in_progress"
          className={`${
            booksFilter === "in_progress" && "bg-emerald-200 text-slate-900 "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          In Progress
        </Link>

        <Link
          href="/?books=completed"
          className={`${
            booksFilter === "completed" && "bg-emerald-200 text-slate-900 "
          } inline-block px-4 sm:px-14 py-2 rounded focus:outline-none`}
        >
          Completed
        </Link>
      </ul>
    </div>
  );
};

export default BookFilter;
