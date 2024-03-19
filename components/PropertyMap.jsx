'use client';

import pin from '@/assets/images/pin.svg';
import 'mapbox-gl/dist/mapbox-gl.css';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { fromAddress, setDefaults } from 'react-geocode';
import { Map, Marker } from 'react-map-gl';

import Spinner from '@/components/Spinner';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [viewport, setViewport] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      const {
        location: { street, city, state, zipcode },
      } = property;
      const response = await fromAddress(
        `${street} ${city} ${state} ${zipcode}`
      );

      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setViewport({ ...viewport, latitude: lat, longitude: lng });
      setLoading(false);
    };

    fetchCoords();
  }, []);

  if (loading) {
    return <Spinner loading={loading} />;
  }

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{ longitude: lng, latitude: lat, zoom: 15 }}
        style={{ width: '100%', height: '500px' }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom">
          <Image src={pin} alt="Location" width="40" height="40" />
        </Marker>
      </Map>
    )
  );
};

export default PropertyMap;
