import axios from 'axios';

export const types = {
  FETCH_ITEM: 'FETCH_ITEM',
};

const ROOT_URL = 'http://jsonplaceholder.typicode.com';

export function greeting(id) {
  // return function(dispatch, getState) {
  //   dispatch({
  //     type: 'GET_GREETING',
  //     message:message,
  //   });
  // }

  const request = axios.get(`${ROOT_URL}/posts/${id}`);
  console.log('ready to return the Promise');
  return {
    type: types.FETCH_ITEM,
    payload: request,
  };

  // return {
  //   type: 'GET_GREETING',
  //   message:message,
  // };
}
 export function mamamiia(){
   //const request = axios.get('https://facebook.github.io/react-native/movies.json');
    return {
      type:'MAMA_MIA',
      payload: getMoviesFromApiAsync()
    }
 }
