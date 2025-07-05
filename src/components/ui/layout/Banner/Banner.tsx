import { useNavigate } from 'react-router';
import './Banner.css'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className='w-full mx-auto'>
            <div className='banner_img text-center pt-[15%] pb-[10%]'>
                <h1
                    className='font-bold text-[30px] sm:text-[40px] text-[#ffffff] mt-4 mb-6'
                >A World of Books at Your Fingertips</h1>
                <p
                    className='font-medium text-[17px] sm:text-2xl text-[rgba(255,255,255,0.7)] mb-6'
                >Beyond Boundaries - access thousands of books with a single click</p>
                <div className='border-2 border-[#7fb11a] p-1.5 inline-block rounded-2xl'>
                    <button
                        onClick={() => navigate('/books')}
                        className='px-5 py-3.5 bg-[#7fb11a] rounded-2xl font-bold text-base text-[#131313] cursor-pointer'
                    >View All Book</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;