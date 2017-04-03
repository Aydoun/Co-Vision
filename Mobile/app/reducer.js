const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_ITEM':
      console.log('FETCH_ITEM');
      return { ...state,
        message : action.payload,
      };
    case 'MAMA_MIA':
      return { ...state,
        gotIt : action.payload,
      };
    default:
      console.log('default');
      break;
  }
  return state;
}
