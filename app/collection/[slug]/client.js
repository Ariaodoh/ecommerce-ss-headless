'use client'
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import { urlFor } from '@/lib/client';

import { Product } from '@/components';

const Client = ({ collection, collectionProducts}) => {
    const itemsPerPage = 16;
    const [products, setProducts] = useState(collectionProducts);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [productsLoading, setProductsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterOption, setFilterOptions] = useState('Alphabetically, A-Z')

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    
    };

    const sortProducts = (option) => {
        setFilterOptions(option);
        setIsOpen(false);

        let sortParam;
        let order
        if (option === "Alphabetically, A-Z"){
            sortParam = 'name'
            order ='asc'
        } else if (option === "Alphabetically, Z-A"){
            sortParam = 'name'
            order ='desc'
        } else if (option === "Price, High - Low"){
            sortParam = 'price'
            order ='desc'
        } else if (option === "Price, Low - High"){
            sortParam = 'price'
            order ='asc'
        } else if (option === "Date, New - Old"){
            sortParam = "_createdAt"
            order ='asc'
        } else if (option === "Date, Old - New"){
            sortParam = "_createdAt"
            order ='desc'
        };

        const sortedProducts = sortListByParam(collectionProducts, sortParam, order);
        currentProducts(sortedProducts)
    };

    const sortListByParam = (list, param, order) => {
        if (!Array.isArray(list) || list.length === 0) {
          return []; 
        }
      
        return list.sort((a, b) => {
          if (a[param] < b[param]) {
            return order === 'asc' ? -1 : 1; 
          }
          if (a[param] > b[param]) {
            return order === 'asc' ? 1 : -1;
          }
          return 0; 
        });
    };

    const currentProducts = (prods) => { 
        const slicedProducts = prods.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
        );

        setProducts(slicedProducts);
    };


    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if(collection || products){
            setIsLoading(false);
        };
    }, [collection, products]);

    useEffect(() => {
        setProductsLoading(true)
        currentProducts(collectionProducts)
    }, [currentPage])

    useEffect(() => {
        setProductsLoading(false)
    }, [products])

    const totalPages = Math.ceil(collectionProducts.length / itemsPerPage)

    const options = ['Alphabetically, A-Z', 'Alphabetically, Z-A', 'Price, High - Low', 'Price, Low - High', 'Date, New - Old', 'Date, Old - New'];

  return (
    <div>
        {isLoading ? (
            <PulseLoader color="#36D7B7" size={15}/>
        ) : (
            <>
                <div>
                    <div>
                        <div className='col-banner-card'>
                            <div className='col-banner-text'>
                                { collection.name && <h1 className='products-heading'>{collection.name}</h1> }
                                { collection.details && <p>{collection.details}</p>}
                            </div>
                            <div className='col-banner-image'>
                                { collection.image &&
                                <img
                                    src={urlFor(collection.image[0].asset._ref).width(700).height(500).fit('crop').url()}
                                    alt='collection-image'
                                />
                                }
                            </div>
                        </div>    
                        <div>
                            <div className='col-filter-card'>
                                <span
                                    onClick={toggleDropdown}
                                    className='col-sort-handle'
                                >
                                    Sort Products: { filterOption } 
                                </span>
                                <p>{products.length} products</p>
                            </div>
                            <div>
                                {isOpen && (
                                    <div className='dropdown-menu'>
                                        <div>
                                            {options.map((option, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => sortProducts(option)}
                                                    className='dropdown-item'
                                                >
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            {productsLoading ? <PulseLoader/> 
                            : <div className='products-container'>
                                {products?.map((item) => (
                                    <Product key={item._id} product={item} />
                                ))}
                             </div>}
                            <div className='col-page-index-card'>
                                {Array.from({length: totalPages}, (_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`col-page-index-btn`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )}
                
    </div>
  )
}

export default Client;