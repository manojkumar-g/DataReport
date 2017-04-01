import axios from 'axios'

export const toggleModel = () => ({
  type : 'TOGGLE_MODEL'
})

export  const filterByName = (name) => ({
  type : 'FILTER_BY_NAME',
  name
});

const requestData = () => ({
  type : 'REQUEST_DATA_FETCH'
})

const setData = (data) => ({
  type : 'SUCCESS_DATA_FETCH',
  data
})

const failureDataRequest = () => ({
  type : 'FAILURE_DATA_FETCH'
})


export const getData = () =>
  dispatch => {
    dispatch(requestData());
    axios.get('api/')
        .then(response => {
            dispatch(setData(response.data))
        })
        .catch(
            err =>
                dispatch(failureDataRequest())
        )

  }

const requestPost = () => ({
  type : 'REQUEST_POST'
})

const successPost = () => ({
  type : 'SUCCESS_POST'
})

const failurePost = () => ({
  type : 'FAILURE_POST'
})

export const postData = (data) =>
    dispatch =>{
        dispatch(requestPost())
        return axios.post('api/add',data)
             .then(response => {
               if(response.status ===200){
                 dispatch(successPost());
                 dispatch(getData());
               }

             })
             .catch(
               ({response:{data}}) => {
                 dispatch(failurePost(data.message))
               }
             )
    }
