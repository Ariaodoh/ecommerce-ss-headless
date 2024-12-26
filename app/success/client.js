'use client';

import { useEffect } from 'react';
import Link from 'next/link';

import { useStateContext } from '@/context/StateContext';
import { runFireworks } from '@/lib/utils';

const SuccessClient = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();
  
    useEffect(() => {
        localStorage.clear();
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireworks();
    }, []);
    
  return (
    <div>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
    </div>
  )
}

export default SuccessClient