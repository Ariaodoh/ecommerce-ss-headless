'use client'

import Link from 'next/link';
import { urlFor } from '@/lib/client';

const HeroBanner = ({ heroBanner }) => {

  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner?.smallText}</p>
        <h3>{heroBanner?.midText}</h3>
        <h1>{heroBanner?.largeText1}</h1>
        {heroBanner?.image &&
          <img 
            src={urlFor(heroBanner.image.asset._ref).height(900).width(900).fit('crop').url()} 
            alt="nailpolish" 
            className="hero-banner-image" />
        }
        <div>
          <Link href={`/product/${heroBanner?.product}`}>
            <button type="button">{heroBanner?.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner?.desc}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner