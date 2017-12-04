import {
  DISCOVER_LIST_LOADING,
  DISCOVER_LIKE_VISION,
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

export function saveDiscoverLike(res) {
  const response = res.data.response;

  return {
    type: DISCOVER_LIKE_VISION,
    likedVisionId: response._id
  };
}
