export const FIGURE_DATA_SUCCESS = "FIGURE_DATA_SUCCESS";

export function FigureDataSuccess(payload) {
  return {
    type: FIGURE_DATA_SUCCESS,
    payload,
  };
}

export function figureData(figure) {
  return (dispatch) => {
    dispatch(FigureDataSuccess(figure));
  };
}
