import axios from 'axios';

function checkStatus(response) {
  var _data = response.data;
  if (response.status >= 200 && response.status < 300 && _data.status) {
    return response;
  }

  const error = new Error(_data.response.data);
  error.response = response;
  throw error;
}

 export default function request(options) {
   return axios(Object.assign(options , {
     headers: {'x-access-token': localStorage.getItem('token') || 'fuck'}
   }))
   .then(checkStatus)
 }
