import {
  VISION_LOADING,
  SAVE_CONTRIBUTION_LOADING,
  DUPLICATE_VISION_ACTION,
  VISION_LIST_LOADING
} from 'constants/visionConstants';


export function prepareSaving(params) {
  return {
    type: VISION_LOADING,
    playload : params
  };
}

export function prepareListing(params) {
  return {
    type: VISION_LIST_LOADING,
    playload : params
  };
}

export function preContribution(params) {
  return {
    type: SAVE_CONTRIBUTION_LOADING,
    playload : params
  };
}

export function visionSaved(res) {
  var response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionId : response.internal,
  };
}

export function saveContribution(res) {
  var response = res.data.response;
  console.log(response , 'response');
  return {
    type: DUPLICATE_VISION_ACTION,
    commitId : response.internal,
  };
}

export function showVisionList(res) {
  var response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionList : response,
  };
}
