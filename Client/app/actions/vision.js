import assign from 'lodash/assign';
import {
  VISION_SAVE_LOADING,
  SAVE_CONTRIBUTION_LOADING,
  DUPLICATE_VISION_ACTION,
  VISION_HISTORY_LOADING,
  ALL_VISION_LIST_LOADING,
  VISION_FS_LOADING,
  VISION_STAT_LOADING,
  BRANCH_LIST_LOADING,
  FILE_READ_LOADING,
  VISION_LIST_LOADING
} from 'constants/vision';


export function prepareSaving(params) {
  return {
    type: VISION_SAVE_LOADING,
    playload : assign({}, params, { loading: true })
  };
}

export function prepareListing(params) {
  return {
    type: VISION_LIST_LOADING,
    playload : params
  };
}

export function prepareAllVisions() {
  return {
    type: ALL_VISION_LIST_LOADING,
    playload : {}
  };
}

export function preContribution(params) {
  return {
    type: SAVE_CONTRIBUTION_LOADING,
    playload : params
  };
}

export function preHistory(params) {
  return {
    type: VISION_HISTORY_LOADING,
    playload : params
  };
}

export function preContent(params) {
  return {
    type: VISION_FS_LOADING,
    playload : params
  };
}

export function preBranch(params) {
  return {
    type: BRANCH_LIST_LOADING,
    playload : params
  };
}

export function preRead(params) {
  return {
    type: FILE_READ_LOADING,
    playload : params
  };
}

export function preStat(params) {
  return {
    type: VISION_STAT_LOADING,
    playload : params
  };
}

export function visionSaved(err, res) {
  if (err) {
    return {
      type: DUPLICATE_VISION_ACTION,
      error: res
    };
  }
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionId : response.data.db._id,
  };
}

export function saveContribution(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    commitId : response.internal,
  };
}

export function showVisionList(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionList : response,
  };
}

export function showAllVisionList(res) {
  console.log(res, 'res');
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    allVisionList : response,
  };
}

export function showHistoryList(res) {
  const response = res.data.response;
  return {
    type: DUPLICATE_VISION_ACTION,
    historyList : response,
  };
}

export function showContentList(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionFS : response,
  };
}

export function showBranchList(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    branchList : response,
  };
}

export function fileContent(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    ContentString : response,
  };
}

export function getVisionStats(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    contributionStats : response,
  };
}
