import { initialState } from "./GlobalState";

const reducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return { ...state, firstCount: state.firstCount + action.value };
    case "DEC":
      return { ...state, firstCount: state.firstCount - action.value };
    case "INC_BY_5":
      return { ...state, secondCount: state.secondCount - action.value };
    case "RESET":
      return initialState;
    default:
  }
};
export default reducer;
