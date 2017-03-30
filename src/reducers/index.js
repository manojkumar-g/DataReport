const reducer = (state = {isModelOpen : false},action) => {
  switch (action.type) {
    case 'TOGGLE_MODEL':
      return{
        ...state,
        isModelOpen : !state.isModelOpen
      }
    default:
      return state;
  }
}

export default reducer;
