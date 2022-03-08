import { useState, useMemo, useCallback, useRef } from 'react';
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from '@react-google-maps/api';
import Places from './places';
import Distance from './distance';
import cluster from 'cluster';

type LatLngLiteralt = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

export default function Map() {
  const mapRef = useRef<GoogleMap>();
  const center = useMemo<LatLngLiteralt>(() => ({ lat: 43, lng: -80 }), []);
  const options = useMemo<MapOptions>(
    () => ({
      mapId: '9ceccdbec36ddfee', // 구글 콘솔에서 map styles, map management로 생성가능
      disableDefaultUI: true, // 기본 도구들 제거
      clickableIcons: false, // 지도 정보(상호) 클릭 불가
    }),
    [],
  );
  //
  const [office, setOffice] = useState<LatLngLiteralt>();
  const [directions, setDirections] = useState<DirectionsResult>();

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house: LatLngLiteralt) => {
    if (office) {
      const service = new google.maps.DirectionsService();
      service.route(
        {
          origin: house,
          destination: office,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if ('OK' === status && result) {
            setDirections(result);
          }
        },
      );
    }
  };

  return (
    <div className="container">
      <div className="controls">
        <h1>Commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
      </div>
      <div className="map">
        <GoogleMap
          center={center}
          zoom={10}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}>
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  zIndex: 50,
                  strokeColor: '#1976D2',
                  strokeWeight: 5,
                },
              }}
            />
          )}

          {office && (
            <>
              <Marker
                position={office}
                icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              />

              <MarkerClusterer>
                {(cluster) =>
                  houses.map((house) => (
                    <Marker
                      key={house.lat}
                      position={house}
                      clusterer={cluster}
                      onClick={() => {
                        fetchDirections(house);
                      }}
                    />
                  ))
                }
              </MarkerClusterer>

              <Circle center={office} radius={15000} options={closeOptions} />
              <Circle center={office} radius={30000} options={middleOptions} />
              <Circle center={office} radius={45000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: '#8BC34A',
  fillColor: '#8BC34A',
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: '#FBC02D',
  fillColor: '#FBC02D',
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: '#FF5252',
  fillColor: '#FF5252',
};

const generateHouses = (position: LatLngLiteralt) => {
  const _houses: Array<LatLngLiteralt> = [];
  for (let i = 0; 100 > i; i++) {
    const direction = 0.5 > Math.random() ? -2 : 2;
    _houses.push({
      lat: position.lat + Math.random() / direction,
      lng: position.lng + Math.random() / direction,
    });
  }
  return _houses;
};
