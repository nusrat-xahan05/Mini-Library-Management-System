import BookCard from "@/components/module/book/BookCard";
import LoadingSpinner from "@/components/ui/layout/LoadingSpinner/LoadingSpinner";
import { useGetBooksQuery } from "@/redux/api/baseApi"
import type { IBook } from "@/types";


export default function AllBooks() {
    const { data, isLoading } = useGetBooksQuery(undefined)
    const allBooks = data?.data || [];

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="bg-[rgba(255,248,231,0.6)]">
            <div className="mx-auto max-w-7xl px-5 pt-11 pb-16">
                {/* -------- CONTENT HEADING -------- */}
                <div className='mb-8 text-center mx-auto w-[85%]'>
                    <h3 className='font-bold text-[30px] sm:text-[32px]'>Our Collection</h3>
                    <p className='max-w-[796px] mx-auto mt-3 font-medium text-base'>Explore all available books at your fingertips.</p>
                </div>

                {/* -------- CONTENT BODY -------- */}
                <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
                    {
                        !isLoading && allBooks.map((book: IBook) => (<BookCard key={book.isbn} book={book}></BookCard>))
                    }
                </div>
            </div>
        </div>
    )
}