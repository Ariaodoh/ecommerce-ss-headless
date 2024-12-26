
import React from 'react';
import Link from 'next/link';

import { urlFor } from '@/lib/client';

const FooterBanner = ({ footerBanner }) => {
  //const  { discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } = footerBanner;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          {footerBanner?.discount &&
            <p>{footerBanner.discount}</p>
          }
          {footerBanner?.largeText1 &&
            <h3>{footerBanner.largeText1}</h3>
          }
          {footerBanner?.largeText2 &&
            <h3>{footerBanner.largeText2}</h3>
          }
          {footerBanner?.saleTime &&
            <p>{footerBanner.saleTime}</p>
          }
        </div>
        <div className="right">
          {footerBanner?.smallText &&
          <p>{footerBanner.smallText}</p>
          }
          {footerBanner?.midText &&
          <h3>{footerBanner.midText}</h3>
          }
          {footerBanner?.desc &&
          <p>{footerBanner.desc}</p>
          }
          {footerBanner?.product &&
          <Link href={`/product/${footerBanner.product}`}>
            {footerBanner?.buttonText && <button type="button">{footerBanner.buttonText}</button>}
          </Link>}
        </div>
       {footerBanner?.image &&
        <img 
        src={urlFor(footerBanner.image.asset._ref).height(550).width(800).fit('crop').url()}  
          className="footer-banner-image"
        />
       }
      </div>
    </div>
  )
}

export default FooterBanner