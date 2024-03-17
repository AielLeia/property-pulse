import '@/assets/styles/globals.css';

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
    <AuthProvider>
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
