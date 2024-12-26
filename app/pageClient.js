'use client';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { Product, FooterBanner, HeroBanner, Collection} from '@/components';


const HomeClient = ({ bannerData, products, collection }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only update isLoading when both bannerData and products are available
        if (products || bannerData) {
          setIsLoading(false);
        }
      }, [products, bannerData]);

      //console.log(bannerData[0].image)
  return (
    <div>
         {isLoading ? (
        <PulseLoader color="#36D7B7" size={15}/>
      ) : (
         <>
          <HeroBanner heroBanner={bannerData?.length && bannerData[0]}/>
          <div className="products-heading">
            <h2>Hottest Products</h2>
            <p>Bestsellers of the season</p>
          </div>
          <div className='products-container'>
            {products?.map((product) => <Product key={product._id} product={product}/>)}
          </div>
          <div className="products-heading">
            <h2>Featured Collections</h2>
            <p>Best finds from our best curators</p>
          </div>
          <div className='products-container'>
            {collection && collection.slice(0,3).map((item, index) => (
             <Collection key={item._id || index} collection={item}/>
            ))}
          </div>
          
          <FooterBanner footerBanner={bannerData && bannerData.slice(-1)[0]}/>
        </>
      )}
    </div>
  )
};

export default HomeClient;