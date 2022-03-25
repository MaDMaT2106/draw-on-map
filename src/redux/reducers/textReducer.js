import { SET_MODAL, SET_INFO_TEXT, SET_MARKER_POSITION } from "../actions/text";

const initialState = {
  showModal: true,
  infoText: [],
  markerPositions: [],
};

export const textReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case SET_INFO_TEXT:
      return {
        ...state,
        infoText: [...state.infoText, action.payload],
      };
    case SET_MARKER_POSITION:
      return {
        ...state,
        markerPositions: [...state.markerPositions, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
