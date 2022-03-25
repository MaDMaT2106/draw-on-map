export const SET_MODAL = "SET_MODAL";
export const SET_INFO_TEXT = "SET_INFO_TEXT";
export const SET_MARKER_POSITION = "SET_MARKER_POSITION";

export const setModal = (payload) => {
  return {
    type: SET_MODAL,
    payload,
  };
};

export const setInfoText = (payload) => {
  return {
    type: SET_INFO_TEXT,
    payload,
  };
};

export const setMarkerPosition = (payload) => {
  return {
    type: SET_MARKER_POSITION,
    payload,
  };
};
