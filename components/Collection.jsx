import { urlFor } from "@/lib/client"
import Link from "next/link";

const Collection = ({ collection }) => {
    return (
        <div>
          <Link href={`/collection/${collection?.slug?.current}`}>
            <div className="product-card">
              {collection?.image && <img 
                src={urlFor(collection.image[0].asset._ref).width(400).height(400).fit('crop').url()}
                className="product-image"
              /> }
              <p className="product-name">{collection?.name}</p>
            </div>
          </Link>
        </div>
    )
}

export default Collection;