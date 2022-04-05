import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { GoogleMap, DrawingManager } from "@react-google-maps/api";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import style from "./Map.module.css";

import defaultTheme from "./Theme";

import MyInfoWindow from "../InfoWindow/InfoWindow";

import { setModal, setMarkerPosition } from "../../redux/actions/text";

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

function Map({ center }) {
  const dispatch = useDispatch();

  const [valueDropdown, setValueDropdown] = useState(false);

  const [active, setActive] = useState(false);

  const [typeFigure, setTypeFigure] = useState();
  const [drawing, setDrawing] = useState(false);
  const [allShapes, setAllShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);

  const types = ["circle", "polyline", "polygon", "text", "arrow"];

  const mapRef = React.useRef(undefined);

  const onLoad = React.useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = React.useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  const onClick = (loc) => {
    const coords = {
      lat: loc.latLng.lat(),
      lng: loc.latLng.lng(),
    };
    if (typeFigure === "text") {
      dispatch(setModal(true));
      dispatch(setMarkerPosition(coords));
    }
  };

  return (
    <div className={style.container}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={onClick}
        options={defaultOptions}
      >
        <DrawingManager
          options={{
            drawingControl: false,
            polylineOptions: {
              icons:
                typeFigure === "arrow"
                  ? [
                      {
                        icon: {
                          path: window.google.maps.SymbolPath
                            .FORWARD_CLOSED_ARROW,
                        },
                        offset: "100%",
                      },
                    ]
                  : null,
            },
          }}
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

        <MyInfoWindow />
      </GoogleMap>

      <div className={style.menu}>
        <div className={style.dropdown}>
          <Dropdown
            isOpen={valueDropdown}
            toggle={() => setValueDropdown(!valueDropdown)}
          >
            <DropdownToggle caret>+</DropdownToggle>
            <DropdownMenu>
              {types.map((item) => (
                <DropdownItem
                  // key={i}
                  onClick={() => {
                    setTypeFigure(item);
                    setDrawing(true);
                    setSelectedShape(null);
                    setActive(true);
                  }}
                >
                  <div>{item}</div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className={active ? style.activeMenu : style.disableMenu}>
          <div className={style.colorInput}>
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
                selectedShape.overlay.setOptions({
                  strokeColor: e.target.value,
                });
              }}
              name="strokecolor"
            />
          </div>

          <button
            type="button"
            className={style.delete}
            onClick={() => selectedShape.overlay.setMap(null)}
          >
            Delete
          </button>

          <input
            className={style.input}
            type="range"
            id="vol"
            name="vol"
            min="0"
            max="50"
            onChange={(e) => {
              selectedShape.overlay.setOptions({
                strokeWeight: e.target.value,
              });
            }}
          />
          <button
            type="button"
            className={style.delete}
            onClick={() => {
              setActive(false);
            }}
          >
            Cancell
          </button>
        </div>
      </div>
    </div>
  );
}
export default React.memo(Map);
