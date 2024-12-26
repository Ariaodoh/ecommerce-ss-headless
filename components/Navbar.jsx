'use client'
import { AiOutlineShopping } from 'react-icons/ai'
import Link from 'next/link';
import { Cart } from './';
import { Navlink } from './';
import { useStateContext } from '@/context/StateContext';


const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  
  return (
    <div className="navbar-container">
      <div className='mobile-nav-menu'>
        <Navlink/>
      </div>
      <div className="logo">
          <Link href="/">Bare and Beautiful</Link>
      </div>
      <div className='cart-icon-card'>
        <button type="button" className="cart-icon" onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className="cart-item-qty">{totalQuantities}</span>
        </button>
      </div>
      
      {showCart && <Cart />}
    </div>
  )
};


export default Navbar