
import { MdCancel } from "react-icons/md";
import Link from 'next/link';

const Cancel = () => {
    return (
      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <MdCancel />
          </p>
          <h1>Payment Canceled. Please try again.</h1>;
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:order@example.com">
              order@example.com
            </a>
          </p>
          <Link href="/">
          <button type="button" width="300px" className="btn">
            Home
          </button>
          </Link>
        </div>
      </div>
    )
  }
  
  export default Cancel;