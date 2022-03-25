import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";

import Map from "../Map/Map";
import Autocomplete from "../Autocomplete/Autocomplete";
import Text from "../Text/Text";

import { getBrowserLocation } from "../../utils/geo";

import styles from "./MainPage.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const defaultCenter = {
  lat: -3.745,
  lng: -38.523,
};

const libraries = ["places"];

const MainPage = () => {
  const dispatch = useDispatch();

  const showModal = useSelector((state) => state.textReducer.showModal);
  const infoText = useSelector((state) => state.textReducer.infoText);
  const [center, setCenter] = React.useState(defaultCenter);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: API_KEY,
    libraries,
  });

  const onPlaceSelect = React.useCallback((coordinates) => {
    setCenter(coordinates);
  }, []);

  React.useEffect(() => {
    getBrowserLocation()
      .then((curLoc) => {
        setCenter(curLoc);
      })
      .catch((defaultLocation) => {
        setCenter(defaultLocation);
      });
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.addressSearchContainer}>
        <Autocomplete isLoaded={isLoaded} onSelect={onPlaceSelect} />
      </div>
      {isLoaded ? <Map center={center} /> : <h2>Loading</h2>}
      {showModal && <Text />}
    </div>
  );
};

export default MainPage;
