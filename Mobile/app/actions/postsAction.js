import axios from 'axios';

export const types = {
  FETCH_ITEM: 'FETCH_ITEM',
  FETCH_USERS : 'FETCH_USERS'
};

const ROOT_URL = 'http://jsonplaceholder.typicode.com';

export function getPostById(id = '') {
    const URL  = 'http://jsonplaceholder.typicode.com' + '/posts/' + id
    const request = axios.get(`${ROOT_URL}/posts/${id}`);
    return {
      type: types.FETCH_ITEM,
      payload: request,
    };
}

export function getUsers(){
    const URL  = 'http://jsonplaceholder.typicode.com' + '/users';
    const request = axios.get(`${ROOT_URL}/users/`);
    console.log('request : ' , `${ROOT_URL}/users/`);
    return {
      type: types.FETCH_USERS,
      payload: request,
    };
}
