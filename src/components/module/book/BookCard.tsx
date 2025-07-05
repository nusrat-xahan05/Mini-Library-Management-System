import { Button } from "@/components/ui/button";
import { useDeleteABookMutation } from "@/redux/api/baseApi";
import { SquarePen, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'


const BookCard = ({ book }: any) => {
    const navigate = useNavigate();
    const [deleteABook] = useDeleteABookMutation();

    // ------ HANDLE DELETE FUNCTION
    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const bookId = id;
                const response = await deleteABook(bookId);
                if (response.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Delete Operation Failed"
                    });
                }
            }
        });
    }

    // ------- CHECK BOOK COPIES AVAILABILITY
    const bookCopiesStatus = book.copies > 0;

    return (
        < div className="bg-white p-4 rounded-lg border-1 border-[#C2B8A3] hover:shadow-2xl hover:border-[#6b6558]" >
            <h2 className="text-lg font-bold mb-2">{book.title}</h2>
            <p className="text-base italic text-gray-700"><span className="font-semibold">Author:</span> {book.author}</p>
            <p className="text-base italic text-gray-700"><span className="font-semibold">Genre:</span> {book.genre}</p>
            <p className="text-base italic text-gray-700"><span className="font-semibold">ISBN:</span> {book.isbn}</p>

            <div className="flex justify-between items-center mt-4 mb-1.5">
                <p className="font-semibold text-sm text-gray-600">Copies: {book.copies}</p>
                <p className="font-semibold text-sm text-gray-600 mb-2">Available: {book.available ? 'Yes' : 'No'}</p>
            </div>

            <div className="flex flex-wrap justify-between items-center border-t border-[#C2B8A3] pt-3.5">
                <div className="flex items-center gap-3">
                    {/* -------- EDIT A BOOK -------- */}
                    <SquarePen
                        onClick={() => navigate(`/edit-book/${book._id}`)}
                        className="size-[22px] text-amber-500 cursor-pointer" />

                    {/* -------- DELETE A BOOK -------- */}
                    <Trash2
                        onClick={() => handleDelete(book._id)}
                        className="size-[22px] text-red-600 cursor-pointer" />
                </div>

                <div className="flex items-center gap-3">
                    {/* -------- VIEW A SINGLE BOOK -------- */}
                    <Button
                        onClick={() => navigate(`/books/${book._id}`)}
                        className="bg-[rgba(255,248,231,0.8)] text-[#2C2C2C] border border-[#C2B8A3] hover:bg-[white] text-sm cursor-pointer">
                        View</Button>

                    {/* -------- BORROW A BOOK -------- */}
                    {bookCopiesStatus ?
                        (<Button
                            onClick={() => navigate(`/borrow/${book._id}`)}
                            className="bg-[#7fb11a] text-[#2C2C2C] border border-[#7fb11a] hover:bg-[white] text-sm cursor-pointer">
                            Borrow</Button>)
                        : (
                            <Button
                                disabled
                                className="bg-[#7fb11a] text-[#2C2C2C] border border-[#7fb11a] hover:bg-[white] text-sm cursor-not-allowed">
                                Unavailable</Button>)
                    }
                </div>
            </div>
        </div >
    );
};

export default BookCard;