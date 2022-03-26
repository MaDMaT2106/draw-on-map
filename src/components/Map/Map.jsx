import React from "react";
import style from "./Map.module.css";

import { GoogleMap } from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import { defaultTheme } from "./Theme";
import { DrawingManager } from "@react-google-maps/api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const [valueDropdown, setValueDropdown] = useState(false);

  const dispatch = useDispatch();

  const [typeFigure, setTypeFigure] = useState();

  const [drawing, setDrawing] = useState(false);

  const types = ["circle", "polyline", "polygon", "text", "arrow"];

  const figures = useSelector((state) => state.getFigures.figures);

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    mapRef.current = undefined;
  }, []);

  const onLoadInfo = () => {};

  console.log(typeFigure);

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
        <DrawingManager
          options={{ drawingControl: false }}
          drawingMode={
            drawing && typeFigure === "circle"
              ? window.google.maps.drawing.OverlayType.CIRCLE
              : drawing && typeFigure === "polyline"
              ? window.google.maps.drawing.OverlayType.POLYLINE
              : drawing && typeFigure === "polygon"
              ? window.google.maps.drawing.OverlayType.POLYGON
              : drawing && typeFigure === "arrow"
              ? window.google.maps.drawing.OverlayType.POLYLINE
              : null
          }
        />
      </GoogleMap>
      <div className={style.dropdown}>
        <Dropdown
          isOpen={valueDropdown}
          toggle={() => setValueDropdown(!valueDropdown)}
        >
          <DropdownToggle caret>+</DropdownToggle>
          <DropdownMenu>
            {types.map((item, i) => (
              <DropdownItem
                key={i}
                onClick={() => {
                  setTypeFigure(item);
                  setDrawing(true);
                  //   setSelectedShape(null);
                }}
              >
                <div>{item}</div>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
    </div>
  );
};
export default React.memo(Map);
