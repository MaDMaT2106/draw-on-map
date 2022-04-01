import {
  SET_MODAL,
  SET_INFO_TEXT,
  SET_MARKER_POSITION,
  DELETE_INFO_TEXT,
} from "../actions/text";

const initialState = {
  showModal: false,
  infoText: [],
  markerPosition: {},
};

const textReducer = (action, state = initialState) => {
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
        markerPosition: { ...action.payload },
      };
    case DELETE_INFO_TEXT:
      return {
        ...state,
        infoText: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default textReducer;
