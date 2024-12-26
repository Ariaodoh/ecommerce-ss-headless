'use client'
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { urlFor } from '@/sanity/lib/image';
import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';

const Client = ({ product, products}) => {
    const [index, setIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const { decQty, incQty, qty, onAdd, setShowCart, setQty } = useStateContext();


    useEffect(() => {
        if(product || products){
            setIsLoading(false);
        };
        setQty(1);
    }, [product, products]);


    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    };

  return (
    <div>
        {isLoading ? (
            <PulseLoader color="#36D7B7" size={15}/>
        ) : (
            <>
                <div className="product-detail-container">
                    <div>
                        <div className="image-container">
                            { product?.image &&
                            <img src={urlFor(product?.image[index])} className="product-detail-image" />
                            }
                        </div>
                        <div className="small-images-container">
                            {product?.image?.map((item, i) => (
                            <img 
                                key={i}
                                src={urlFor(item)}
                                className={i === index ? 'small-image selected-image' : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                            ))}
                        </div>
                    </div>

                    <div className="product-detail-desc">
                        <h1>{product?.name}</h1>
                        <div className="reviews">
                            <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                            </div>
                            <p>
                            (20)
                            </p>
                        </div>
                        <h4>Details: </h4>
                        <p>{product?.details}</p>
                        <p className="price">${product?.price}</p>
                        <div className="quantity">
                            <h3>Quantity:</h3>
                            <p className="quantity-desc">
                            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                            </p>
                        </div>
                        <div className="buttons">
                            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                        </div>
                        </div>
                    </div>

                    <div className="maylike-products-wrapper">
                        <h2>You may also like</h2>
                        <div className="marquee">
                            <div className="maylike-products-container track">
                            {products?.map((item) => (
                                <Product key={item._id} product={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </>
        )}
                
    </div>
  )
}

export default Client;