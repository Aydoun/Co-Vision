import {
  VISION_SAVED,
  VISION_LOADING,
  VISION_LIST,
  VISION_LIST_LOADING
} from 'constants/visionConstants';


export function prepareSaving(params) {
  return {
    type: VISION_LOADING,
    playload : params
  };
}

export function visionSaved(res) {
  var response = res.data.response;
  return {
    type: VISION_SAVED,
    visionId : response.internal,

  };
}

export function prepareListing(params) {
  return {
    type: VISION_LIST_LOADING,
    playload : params
  };
}

export function showVisionList(res) {
  var response = res.data.response;
  console.log(response , 'response');

  return {
    type: VISION_LIST,
    visionList : response,
  };
}
