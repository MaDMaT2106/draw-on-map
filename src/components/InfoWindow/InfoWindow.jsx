import React from "react";
import { InfoWindow } from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
import { deleteInfoText } from "../../redux/actions/text";

import styles from "./InfoWindow.module.css";

function MyInfoWindow() {
  const dispatch = useDispatch();

  const infoText = useSelector((state) => state.textReducer.infoText);

  return (
    <div>
      {infoText.map((item) => (
        <InfoWindow
          position={item.position}
          key={item.title}
          onCloseClick={() => dispatch(deleteInfoText(infoText, item.title))}
        >
          <div>
            <p className={styles.text}>
              <strong>{item.title}</strong>
            </p>
            <p className={styles.text}>{item.description}</p>
          </div>
        </InfoWindow>
      ))}
    </div>
  );
}
export default MyInfoWindow;
