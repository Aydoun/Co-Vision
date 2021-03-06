import assign from 'lodash/assign';
import axios from 'axios';

function checkStatus(response) {
  const _data = response.data;
  if (response.status === 200 && _data.status) {
    return response;
  }

  const error = new Error(_data.response.data);
  error.response = response;
  throw error;
}

 export default function request(options) {
   return axios(assign(options, {
     headers: { 'x-access-token': localStorage.getItem('token') },
     timeout: 15 * 1000,
   }))
   .then(checkStatus);
 }
