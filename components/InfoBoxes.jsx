import InfoBox from '@/components/InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox
            buttonInfo={{
              link: '/properties',
              text: 'Browse Properties',
              backgroundColor: 'bg-black',
            }}
            heading={'For Renters'}
          >
            Find your dream rental property. Bookmark properties and contact
            owners.
          </InfoBox>
          <InfoBox
            buttonInfo={{
              link: '/properties/add',
              text: 'Add Property',
              backgroundColor: 'bg-blue-500',
            }}
            backgroundColor={'bg-blue-100'}
            heading={'For Property Owners'}
          >
            List your properties and reach potential tenants. Rent as an airbnb
            or long term.
          </InfoBox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
