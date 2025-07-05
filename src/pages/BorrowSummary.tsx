import LoadingSpinner from "@/components/ui/layout/LoadingSpinner/LoadingSpinner";
import { useBorrowSummaryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
    const { data, isLoading } = useBorrowSummaryQuery(undefined);
    const borrowSummary = data?.data || [];

    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="bg-[#7A9E7E]">
            <div className="mx-auto max-w-7xl px-5 pt-11 pb-16">
                {/* -------- CONTENT HEADING -------- */}
                <div className='mb-8 text-center mx-auto w-[85%] text-white'>
                    <h3 className='font-bold text-[32px]'>Borrow Book Summary</h3>
                    <p className='max-w-[796px] mx-auto mt-3 font-medium text-base'>Explore all of your borrow books summary at a time.</p>
                </div>

                {/* -------- CONTENT BODY -------- */}
                <table className="w-[90%] sm:w-[85%] mx-auto text-left border-collapse">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            <th className="py-3 px-4 text-center">Book Title</th>
                            <th className="py-3 px-4 text-center">ISBN</th>
                            <th className="py-3 px-4 text-center">Total Quantity</th>
                        </tr>
                    </thead>
                    <tbody className="bg-[rgba(122,158,126,0.52)]">
                        {borrowSummary.map((item: any, idx: number) => (
                            <tr key={idx} className="border-b bg-[rgba(167,186,169,0.6)]">
                                <td className="py-3 px-4 text-center">{item.book.title}</td>
                                <td className="py-3 px-4 text-center">{item.book.isbn}</td>
                                <td className="py-3 px-4 text-center font-semibold">{item.totalQuantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BorrowSummary;