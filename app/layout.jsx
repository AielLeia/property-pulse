import '@/assets/styles/globals.css';

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
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
};

export default MainLayout;
