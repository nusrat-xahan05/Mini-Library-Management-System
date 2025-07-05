import LoadingSpinner from "@/components/ui/layout/LoadingSpinner/LoadingSpinner";
import { useGetABookQuery } from "@/redux/api/baseApi";
import { Link, useParams } from "react-router";


const BookDetails = () => {
    const { id } = useParams();
    const { data: book, isLoading } = useGetABookQuery(id!);

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className='mx-auto max-w-7xl bg-[#7A9E7E] py-8'>
            {/* -------- CONTENT HEADING -------- */}
            <div className='mb-8 text-center mx-auto w-[85%]'>
                <h4 className="text-[30px] sm:text-[32px] mt-2 font-bold text-[#ffffff]">Book Details</h4>
                <p className="font-normal text-lg text-[rgba(255,255,255,0.6)]">See the all details at a glance</p>
            </div>

            <div className="w-[85%] sm:w-[64%] lg:w-[55%] mx-auto border-2 border-white p-8 rounded-4xl mt-8 text-white">
                <h1 className="text-3xl font-bold mb-4">{book?.data.title}</h1>
                <p className="text-lg mb-2">
                    <strong>Author:</strong> {book?.data.author}
                </p>
                <p className="text-lg mb-2">
                    <strong>Genre:</strong> {book?.data.genre}
                </p>
                <p className="text-lg mb-2">
                    <strong>ISBN:</strong> {book?.data.isbn}
                </p>
                <p className="text-lg mb-2">
                    <strong>Copies Available:</strong> {book?.data.copies}
                </p>
                <p className="text-lg mb-2">
                    <strong>Availability:</strong> {book?.data.available ? "Available" : "Not Available"}
                </p>

                <Link to="/books" className="inline-block mt-6 px-4 py-2 bg-white text-[#7A9E7E] font-semibold text-lg rounded hover:bg-green-800 hover:text-white">
                    Back to All Books
                </Link>
            </div>
        </div>
    );
};

export default BookDetails;