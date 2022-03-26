import React from "react";
import style from "./Map.module.css";

import { GoogleMap, Polygon, Polyline } from "@react-google-maps/api";
import { Circle } from "@react-google-maps/api";
import { defaultTheme } from "./Theme";
import { figureData } from "../../redux/actions/figures.js";
import { DrawingManager } from "@react-google-maps/api";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

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
  const [valueDropdown, setValueDropdown] = useState(false);

  const dispatch = useDispatch();

  const [typeFigure, setTypeFigure] = useState();

  const [drawing, setDrawing] = useState(false);

  const [allShapes, setAllShapes] = useState([]);

  const [selectedShape, setSelectedShape] = useState(null);

  console.log(allShapes);
  console.log(selectedShape);

  const types = ["circle", "polyline", "polygon", "text", "arrow"];

  const figures = useSelector((state) => state.getFigures.figures);

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
          onOverlayComplete={(e) => {
            setAllShapes([...allShapes, e]);
            window.google.maps.event.addListener(e.overlay, "click", () => {
              setSelectedShape(e);
            });
          }}
        />
      </GoogleMap>
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
                setSelectedShape(null);
              }}
            >
              <div>{item}</div>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <input
        type="color"
        id="favcolor"
        onChange={(e) => {
          selectedShape.overlay.setOptions({ fillColor: e.target.value });
        }}
        name="favcolor"
      />
      <input
        type="color"
        id="strokecolor"
        onChange={(e) => {
          selectedShape.overlay.setOptions({ strokeColor: e.target.value });
        }}
        name="strokecolor"
      />
      <button onClick={(e)=>selectedShape.overlay.setMap(null)}>Delete</button>
    </div>
  );
};
export default React.memo(Map);
