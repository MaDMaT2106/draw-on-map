import { FIGURE_DATA_SUCCESS } from "../actions/figures";

const initialState = {
  figures: [],
};

export function getFigures(state = initialState, action) {
  switch (action.type) {
    case FIGURE_DATA_SUCCESS:
      return {
        ...state,
        figures: action.payload,
      };
    default:
      return state;
  }
}
