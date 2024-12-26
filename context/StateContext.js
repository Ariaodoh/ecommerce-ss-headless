'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { client } from '@/sanity/lib/client';

const Context = createContext();

export const StateContext = ({ children }) => {

    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [navlinks, setNavLinks] = useState();
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        try {
            const cachedCartItems = localStorage.getItem('cartItems');
            const cachedTotalPrice = localStorage.getItem('totalPrice');
            const cachedTotalQuantities = localStorage.getItem('totalQuantities');
            
            cachedCartItems && setCartItems(JSON.parse(cachedCartItems));
            cachedTotalPrice && setTotalPrice(JSON.parse(cachedTotalPrice));
            cachedTotalQuantities && setTotalQuantities(JSON.parse(cachedTotalQuantities));

        } catch (error) {
            console.log("Error fetching cart data", error);
            setCartItems([]);
            setTotalPrice(0);
            setTotalQuantities(0);
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalPrice');
            localStorage.removeItem('totalQuantities');  
        }
    }, []);


    useEffect(() => {
        const fetchNavLinks = async () => {
            const query = `*[_type == "collection"] {
            name,
            "slug" : slug.current
            }`;
        
            try {
              const response = await client.fetch(query);
              setNavLinks(response)
            } catch (error) {
              console.error('Error fetching Nav collections:', error)
            }
          };
        
    fetchNavLinks();
    }, []);


    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
        localStorage.setItem('totalQuantities', JSON.stringify(totalQuantities));
    }, [cartItems, totalPrice, totalQuantities]);

    let foundProduct;

    const onAdd = (product, quantity) => {

        if (!product || !quantity) {
            toast.error("Something went wrong, please try again");
            throw new Error("Product and Quantity required");
            
        }

        const checkProductInCart = cartItems?.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + (product.price * quantity));
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if(checkProductInCart) {

           setCartItems((prevCartItems) =>
                prevCartItems.map((cartProduct) => 
                    cartProduct._id === product._id
                        ? {...cartProduct, quantity: cartProduct.quantity + quantity}
                        : cartProduct
                )
            );
           
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);
        }

        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const onRemove = (product) => {

        if (!product) {
            toast.error("Something went wrong, please try again");
            throw new Error("Product required");
            
        }

        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemsQuantity = (id, value) => {

        if (!id || !value) {
            toast.error("Something went wrong, please try again")
            throw new Error("Id and Value required");
            
        }

        foundProduct = cartItems?.find((item) => item._id === id)

        if (value === 'inc') {

            setCartItems((prevCartItems) =>
                prevCartItems.map((cartProduct) => 
                    cartProduct._id === id
                        ? {...cartProduct, quantity: cartProduct.quantity + 1}
                        : cartProduct
                )
            );

            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {

                setCartItems((prevCartItems) =>
                    prevCartItems.map((cartProduct) => 
                        cartProduct._id === id
                            ? {...cartProduct, quantity: cartProduct.quantity - 1}
                            : cartProduct
                    )
                );

                setTotalPrice ((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    
          
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                navlinks,
                setShowCart,
                setQty,
                incQty,
                decQty,
                onAdd,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities,
                toggleCartItemsQuantity
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => {
    
    const context = useContext(Context);
    if (!context) {
        throw new Error('useStateContext must be used within a StateContext Provider');
    }
    return context;
};