'use client';

import toast from 'react-hot-toast';

const CheckoutButton = ({gatewayPromise, buttonText, checkoutItems, apiRoute }) => {
    const handleCheckout = async () => {
        const gateway = await gatewayPromise();

        //create checkout session
        const response = await fetch(`${apiRoute}`, {
            method : 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ checkoutItems }),
        });

        const { sessionId } = await response.json();
        toast.loading('Redirecting...');

        //Redirect to payment gateway Checkout
        //stripe specific implementation 
        if (buttonText === 'PAY WITH STRIPE'){
            const { error } = await gateway.redirectToCheckout({ sessionId });
            
            if (error) {
                console.error(error.message);
            };
        };
        
    }; 

  return (
    <button className='btn' onClick={handleCheckout}>{buttonText}</button>
  )
}

export default CheckoutButton