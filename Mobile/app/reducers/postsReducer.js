const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ITEM':
      console.log('FETCH_ITEM');
      return { ...state,
        message : action.payload.data,
      };
    case 'FETCH_USERS':
      console.log('FETCH_USERS');
      return { ...state,
        users : action.payload.data,
      };
    default:
      console.log('default');
      break;
  }
  return state;
}
