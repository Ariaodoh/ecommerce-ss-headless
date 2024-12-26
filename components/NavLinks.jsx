'use client'
import { useState } from 'react';
import Link from 'next/link';
import { useStateContext } from '@/context/StateContext';

const NavLink = () => {
    const { navlinks } = useStateContext();
    const [ isOpen, setIsOpen ] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return(
        <nav className='navbar'>
            <button
                className='hamburger'
                onClick={toggleMenu}
                aria-label='Toggle navigation'
            >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </button>
            <div className={`nav-menu ${isOpen ? 'open' : ''}`}>
                {navlinks && navlinks.slice(0, 3).map((item, index) => (
                    <Link href={`/collection/${item?.slug}`} key={index}>
                        <span className="navlink-item">{item.name}</span>
                    </Link>
                ))}
            </div>
            {isOpen && <div className='overlay' onClick={toggleMenu}></div>}
        </nav>
    );
};

export default NavLink;