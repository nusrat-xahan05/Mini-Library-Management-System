import { Link, NavLink, useLocation } from "react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from './../../../assets/logo.png';

const NavBar = () => {
    const { pathname } = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className={`px-4 ${pathname == '/' ? 'absolute w-full bg-[rgba(0,0,0,0.67)] z-[10]' : 'bg-[#000000]'}`}>
            <div className="flex justify-between items-center py-4">

                {/* ------ LOGO ------ */}
                <Link
                    to='/'
                    className="font-bold text-xl flex items-center gap-3">
                    <img src={logo} alt="Logo" />
                    <h3 className="text-[white]">Mini<span className="text-[#6B8E23]">Library</span></h3></Link>

                {/* ------ DESKTOP NAV ------ */}
                <div className="hidden lg:flex items-center">
                    <NavLink
                        to='/books'
                        className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                    >All Books</NavLink>
                    <NavLink
                        to='/create-book'
                        className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                    >Add Book</NavLink>
                    <NavLink
                        to='/borrow-summary'
                        className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                    >Borrow Summary</NavLink>
                </div>

                {/* Mobile Hamburger */}
                <div className="lg:hidden">
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
                    </button>
                </div>

                {/* ------ MOBILE NAV ------ */}
                {isOpen && (
                    <div className="absolute top-[80px] right-0 w-[200px] bg-[#6B8E23] z-50 flex flex-col items-center py-4 lg:hidden">
                        <NavLink
                            to='/books'
                            className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                        >All Books</NavLink>
                        <NavLink
                            to='/create-book'
                            className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                        >Add Book</NavLink>
                        <NavLink
                            to='/borrow-summary'
                            className={({ isActive }) => `font-medium text-base text-white px-4 py-1.5 rounded-lg ${isActive ? 'border-2 border-[white]' : ''}`}
                        >Borrow Summary</NavLink>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
