import React, { FC, PropsWithChildren } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

interface MapProps {
  api: string;
  center: {
    lat: number;
    lng: number;
  };
  containerStyle?: {
    width: string;
    height: string;
  };
  zoom?: number;
  infoWindowContent?: React.ReactElement;
}

const Map: FC<PropsWithChildren<MapProps>> = ({
  center,
  api,
  children,
  infoWindowContent,
  zoom = 13,
  containerStyle = { width: '100%', height: '400px' },
}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api,
  });

  const [marker, setMarker] = React.useState<google.maps.Marker | null>(null);

  const onMarkerLoad = React.useCallback(function callback(
    marker: google.maps.Marker
  ) {
    // Setting marker Instance
    setMarker(marker);
  },
  []);

  const onMarkerUnmount = React.useCallback(function callback(
    marker: google.maps.Marker
  ) {
    setMarker(null);
  },
  []);

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
      {/* Child components, such as markers, info windows, etc. */}
      {children}
      <Marker
        position={center}
        clickable={false}
        onLoad={onMarkerLoad}
        onUnmount={onMarkerUnmount}
      />
      {marker && infoWindowContent && (
        <InfoWindow anchor={marker}>{infoWindowContent}</InfoWindow>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(Map);
