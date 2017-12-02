import {
  DISCOVER_LIST_LOADING,
  DISCOVER_VISION
} from 'constants/discover';

export function preDicoverList(params = {}) {
  return {
    type: DISCOVER_LIST_LOADING,
    payload: params
  };
}

export function getDicoverList(res) {
  return {
    type: DISCOVER_VISION,
    discoverList: res.data.response
  };
}
