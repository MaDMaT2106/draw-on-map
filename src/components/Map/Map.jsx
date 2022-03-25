import React from "react";
import style from "./Map.module.css";
import { GoogleMap, InfoWindow } from "@react-google-maps/api";
import { defaultTheme } from "./Theme";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const positions = [
  { lat: 49.204345729017966, lng: 28.471893808478217 },
  { lat: 60.204345729017966, lng: 28.471893808478217 },
  { lat: 88.204345729017966, lng: 28.471893808478217 },
];

const defaultOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardShortcuts: false,
  scrollwheel: true,
  disableDoubleClickZoom: false,
  fullscreenControl: false,
  styles: defaultTheme,
};

const Map = ({ center }) => {
  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  return (
    <div className={style.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={defaultOptions}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {/* {positions.map((pos) => {
          return (
            <InfoWindow onLoad={onLoad} position={pos}>
              <div>InfoWindow</div>
            </InfoWindow>
          );
        })} */}
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
