
import { client } from "@/sanity/lib/client";
import Client from "./client";


const CollectionDetails = async ({ params }) => {
    
  const { slug } = params;
  const collection = await fetchCollection({ slug })

  const collectionTags =  collection.metafield.find((item) => item.title === 'Tags');
  const products = await fetchCollectionProducts(collectionTags.values);

  //console.log(products);
  
  return (
    <div>
      <Client collection={collection} collectionProducts={products}/>
    </div>
  )
}


export const fetchCollection = async ({ slug }) => {
  const query = `*[_type == "collection" && slug.current == '${slug}'][0]`;
  
  const collection = await client.fetch(query);
  
  return collection
  
}


export const fetchCollectionProducts = async ( tags ) => {
    let combinedResult = [];

    for (const tag of tags){
      const ids = combinedResult?.map(obj => obj._id);
      try{
          const query = `*[_type == "product" && $tag in metafield[title == "Tags"].values[] && !(_id in $ids)] {
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
          const response = await client.fetch(query, { tag, ids});
          
          combinedResult = [...combinedResult, ...response];

      } catch (error) {
          console.error("Error fetching products:", error);
      }
    }

  return combinedResult;
}


export default CollectionDetails;