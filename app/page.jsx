import FeaturesProperties from '@/components/FeaturesProperties';
import Hero from '@/components/Hero';
import HomeProperty from '@/components/HomeProperty';
import InfoBoxes from '@/components/InfoBoxes';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturesProperties />
      <HomeProperty />
    </>
  );
};

export default HomePage;
