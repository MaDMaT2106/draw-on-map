import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { GoogleMap, Polygon, Polyline, Circle } from "@react-google-maps/api";
import defaultTheme from "./Theme";
import { figureData } from "../../redux/actions/figures.js";

import style from "./Map.module.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

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
  const dispatch = useDispatch();

  const [rad, setRad] = useState(30000);

  const figures = useSelector((state) => state.getFigures.figures);

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  if (figures.length !== 0) {
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
          {figures.map((object, index) => {
            switch (object.type) {
              case "circle":
                return (
                  <Circle
                    center={center}
                    radius={rad}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      clickable: false,
                      draggable: false,
                      editable: true,
                      visible: true,
                      zIndex: 1,
                    }}
                    key={index}
                  />
                );
              case "polygon":
                return (
                  <Polygon
                    paths={[
                      { lat: 25.774, lng: -80.19 },
                      { lat: 18.466, lng: -66.118 },
                      { lat: 32.321, lng: -64.757 },
                      { lat: 25.774, lng: -80.19 },
                    ]}
                    options={{
                      fillColor: "lightblue",
                      fillOpacity: 1,
                      strokeColor: "red",
                      strokeOpacity: 1,
                      strokeWeight: 2,
                      clickable: false,
                      draggable: false,
                      editable: true,
                      geodesic: false,
                      zIndex: 1,
                    }}
                  />
                );
              case "polyline":
                return (
                  <Polyline
                    path={[
                      { lat: 37.772, lng: -122.214 },
                      { lat: 21.291, lng: -157.821 },
                      { lat: -18.142, lng: 178.431 },
                      { lat: -27.467, lng: 153.027 },
                    ]}
                    options={{
                      strokeColor: "#FF0000",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#FF0000",
                      fillOpacity: 0.35,
                      clickable: false,
                      draggable: false,
                      editable: true,
                      visible: true,
                      radius: rad,
                      paths: [
                        { lat: 37.772, lng: -122.214 },
                        { lat: 21.291, lng: -157.821 },
                        { lat: -18.142, lng: 178.431 },
                        { lat: -27.467, lng: 153.027 },
                      ],
                      zIndex: 1,
                    }}
                  />
                );
            }
          })}
        </GoogleMap>
        <button
          className={style.buttons}
          onClick={() => {
            figures.push({ type: "circle" });
            setRad(rad + 1);
            dispatch(figureData(figures));
          }}
        >
          Circle
        </button>
      </div>
    );
  } else if (figures.length === 0) {
    return (
      <div className={style.container}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={defaultOptions}
        ></GoogleMap>
        <button
          className={style.buttons}
          onClick={() => {
            figures.push({ type: "circle" });
            setRad(rad + 1);

            dispatch(figureData(figures));
          }}
        >
          Circle
        </button>
      </div>
    );
  }
};
export default React.memo(Map);
