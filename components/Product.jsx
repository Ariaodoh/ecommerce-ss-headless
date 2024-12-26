
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';

const Product = ({ product }) => {

  const sanityImageUrl = product.images[0].asset.url;
  const assetRef = sanityImageUrl.split("/").slice(-1)[0].replace(".", "-");
  
  return (
    <div>
      <Link href={`/product/${product?.slug?.current}`}>
        <div className="product-card">
          {product?.images && <img 
            src={urlFor(`image-${assetRef}`)}
            width={250}
            height={250}
            className="product-image"
          /> }
          <p className="product-name">{product?.name}</p>
          <p className="product-price">${product?.price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product