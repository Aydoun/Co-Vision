import {
  VISION_SAVED,
  VISION_LOADING
} from './constants';


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
