
import { client } from "@/sanity/lib/client";
import Client from "./client";

const ProductDetails = async ({ params }) => {
    
  const { slug } = params;
  const productById = await fetchProductbyId({ slug });
  const relatedProducts = await fetchAllProducts();

  return (
    <div>
      <Client product={productById} products={relatedProducts}/>
    </div>
  )
}


export const fetchProductbyId = async ({ slug }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  
  const product = await client.fetch(query);
  
  return product
  
}


export const fetchAllProducts = async () => {
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
}


export default ProductDetails