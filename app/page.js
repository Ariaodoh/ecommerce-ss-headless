
import { client } from '@/lib/client';
import HomeClient from './pageClient';

const Home = async () => {
  const products = await fetchProducts();
  const bannerData = await fetchBanner();
  const collections = await fetchCollections();
  
  return(
    <div>
      <HomeClient bannerData={bannerData} products={products} collection={collections}/>
    </div>
  )  
};


const fetchProducts = async () => {
  try {
    const query = `*[_type == "product"] {
      _id,
      _rev,
      _type,
      details,
      name,
      price,
      "images": image[]{
        _key,
        asset->{
          url
        }
      },
      slug {
        current
      }
    }`;

    const products = await client.fetch(query);
    return products;
  } catch (error) {
    console.error("Error Fetching Products:", error);
    
  }
}; 

const fetchBanner = async () => {
  try {
    const bannerQuery = `*[_type == "banner"] {
      _id,
      _rev,
      _type,
      buttonText,
      desc,
      discount,
      image {
        asset->{
          url
        }
      },
      largeText1,
      largeText2,
      midText,
      product,
      saleTime,
      smallText
    }`;

    const data = await client.fetch(bannerQuery);
  
    const bannerData = data.map((item) => ({
      ...item,
      image: {
        ...item.image,
        asset: {
          ...item.image.asset,
          _ref: `image-${item.image.asset.url.split("/").slice(-1)[0].replace(".", "-")}`,
        },
      }
    }));

  
    return bannerData;

  } catch (error) {
    console.error('Error fetching banner', error);
    
  }
}


const fetchCollections = async () => {
  const query = `*[_type == "collection"]`
  try {
    const response = await client.fetch(query);
    return response;
  } catch (error) {
    console.error('Error fetching collections:', error)
  }
}

export default Home;