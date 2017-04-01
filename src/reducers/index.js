const reducer = (state = {
  isModelOpen : false,
  requestPost : false,
  successPost :false,
  failurePost:false,
  data :[],
  requestDataFetch : false,
  successDataFetch :false,
  failureDataFetch:false,
  name:''
  },action) => {
  switch (action.type) {
    case 'TOGGLE_MODEL':
      return{
        ...state,
        isModelOpen : !state.isModelOpen
      }
    case 'FILTER_BY_NAME':
      return{
        ...state,
        name : action.name
      }
    case 'REQUEST_POST':
      return{
        ...state,
        requestPost : true
      }
    case 'SUCCESS_POST':
      return{
        ...state,
        requestPost : false,
        successPost:true,
        failurePost:false
      }
    case 'FAILURE_POST':
      return{
        ...state,
        requestPost : false,
        successPost:false,
        failurePost:true
      }
      case 'REQUEST_DATA_FETCH':
        return{
          ...state,
          requestDataFetch : true
        }
      case 'SUCCESS_DATA_FETCH':
        return{
          ...state,
          requestDataFetch : false,
          successDataFetch:true,
          failureDataFetch:false,
          data:action.data

        }
      case 'FAILURE_DATA_FETCH':
        return{
          ...state,
          requestDataFetch : false,
          successDataFetch:false,
          failureDataFetch:true
        }
    default:
      return state;
  }
}

export default reducer;
