'use client'
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import { useEffect, useState } from 'react';
import CheckoutButton from './CheckoutButton';

const Cart = () => {
  //const cartRef = useRef();
  const { totalPrice, totalQuantities, cartItems, setShowCart, toggleCartItemsQuantity, onRemove } = useStateContext();

  const [lineItems, setLineItems] = useState([]);

  useEffect(() => {
    if (cartItems) {
      const items = cartItems.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img.replace('image-', 'https://cdn.sanity.io/images/0kpqmbjb/production/').replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100, // Stripe expects amount in cents
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      });

      setLineItems(items); // Update lineItems state
    }
  }, [cartItems]);


  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <button
        type="button"
        className="cart-heading"
        onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems?.length < 1 && (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        )}

        <div className="product-container">
          {cartItems?.length >= 1 && cartItems.map((item) => (
            <div className="product" key={item?._id}>
              <img src={urlFor(item?.image[0])} className="cart-product-image" />
              <div className="item-desc">
                <div className="flex top">
                  <h5>{item?.name}</h5>
                  <h4>${item?.price}</h4>
                </div>
                <div className="flex bottom">
                  <div>
                  <p className="quantity-desc">
                    <span className="minus" onClick={() => toggleCartItemsQuantity(item?._id, 'dec') }>
                    <AiOutlineMinus />
                    </span>
                    <span className="num">{item?.quantity}</span>
                    <span className="plus" onClick={() => toggleCartItemsQuantity(item?._id, 'inc') }><AiOutlinePlus /></span>
                  </p>
                  </div>
                  <button
                    type="button"
                    className="remove-item"
                    onClick={() => onRemove(item)}
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {cartItems?.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className="btn-container">
              <CheckoutButton 
                gatewayPromise={getStripe} 
                buttonText={'PAY WITH STRIPE'}
                checkoutItems={lineItems}
                apiRoute={'/api/stripe'} 
                className='btn'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart