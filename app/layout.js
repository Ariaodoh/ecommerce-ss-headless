import "@/app/styles/style.css";

import { Navbar } from "@/components";
import { Footer } from "@/components";
import { Toaster } from 'react-hot-toast';
import { StateContext } from '@/context/StateContext';


export const metadata = {
  title: "Ecommerce Store Front",
  description: "Generic Ecommerce store front",
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <StateContext>
          <Toaster/>
          <header>
            <Navbar/>
          </header>
          <main className="main-container">
            {children}
          </main>
          <footer>
            <Footer />
          </footer>
        </StateContext> 
      </body>
    </html>
  );
}
