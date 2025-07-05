import { Link } from "react-router";
import logo from './../../../assets/logo.png';

const Footer = () => {
    return (
        <footer className="bg-[rgba(0,0,0,0.9)]">
            <div className="max-w-7xl mx-auto text-[white]">
                <div className="grid grid-cols-1 md:grid-cols-4 items-center py-10">
                    <div className="flex flex-col items-center mb-5 md:mb-0">
                        <Link
                            to='/'
                            className="font-bold text-xl">
                            <img className="mx-auto" src={logo} alt="Logo" />
                            <h3 className="text-[white]">Mini<span className="text-[#6B8E23]">Library</span></h3></Link>
                    </div>

                    <nav className='text-center mx-auto mb-5 md:mb-0'>
                        <h6 className="font-bold text-lg mb-4">Services</h6>
                        <div className="flex flex-row md:flex-col gap-4 md:gap-0">
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Order Tracking</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Shipping & Delivery</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Return Facility</a>
                        </div>
                    </nav>

                    <nav className='text-center mx-auto mb-5 md:mb-0'>
                        <h6 className="font-bold text-lg mb-4">Company</h6>
                        <div className="flex flex-row md:flex-col gap-4 md:gap-0">
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">About Us</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Book List</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Contact</a>
                        </div>
                    </nav>

                    <nav className='text-center mx-auto mb-5 md:mb-0'>
                        <h6 className="font-bold text-lg mb-4">Legal Policy</h6>
                        <div className="flex flex-row md:flex-col gap-4 md:gap-0">
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Terms</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Privacy Policy</a>
                            <a className="link link-hover text-center font-normal text-base text-[rgba(255,255,255,.67)] leading-8">Cookie Policy</a>
                        </div>
                    </nav>
                </div>

                {/* ----- COPYRIGHT ----- */}
                <div className="bg-[#000000] text-center font-normal text-base text-[rgba(255,255,255,.8)] py-6 border-t border-[rgba(255,255,255,.3)]">
                    <div className="max-w-7xl mx-auto px-4">
                        <p>&copy; 2025, MiniLibrary. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
