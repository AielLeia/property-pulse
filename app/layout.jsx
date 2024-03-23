import '@/assets/styles/globals.css';
import { GlobalContextProvider } from '@/context/GlobalContext';
import 'photoswipe/dist/photoswipe.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthProvider from '@/components/AuthProvider';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

/**
 * @type {import('next').Metadata}
 */
export const metadata = {
  title: 'Property pulse | Find the perfect rental.',
  description: 'Find your dream rental property.',
  keywords: 'rental, find rentals, find properties',
};

const MainLayout = ({ children }) => {
  return (
    <GlobalContextProvider>
      <AuthProvider>
        <html lang="en">
          <body className="h-screen">
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalContextProvider>
  );
};

export default MainLayout;
