import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  //   DirectionsService,
} from "@react-google-maps/api";
// import Places from "./places";
// import Distance from "./distance";

const Map = (props) => {
  const mapRef = props.mapRef;
  const directions = props.directions;
  const origin = props.origin;
  const destination = props.destination;
  const center = useMemo(() => ({ lat: 31.5204, lng: 74.3587 }), []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const options = useMemo(
    () => ({
      mapId: "c61d99011041fd57",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );

  console.log("directions: ", directions);

  return (
    <GoogleMap
      zoom={10}
      center={center}
      mapContainerClassName={props.Style}
      options={options}
      onLoad={onLoad}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: {
              zIndex: 50,
              strokeColor: "#1976D2",
              strokeWeight: 5,
            },
          }}
        />
      )}

      {(origin || destination) && (
        <>
          <Marker
            position={origin}
            // icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
          <Marker
            position={destination}
            // icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
          />
        </>
      )}
    </GoogleMap>
  );
};

export default Map;
