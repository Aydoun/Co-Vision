import assign from 'lodash/assign';
import * as C from 'constants/vision';
import { DISCOVER_LIKE_VISION } from 'constants/discover';


export function prepareSaving(params) {
  return {
    type: C.VISION_SAVE_LOADING,
    payload : params
  };
}

export function prepareListing(params) {
  return {
    type: C.VISION_LIST_LOADING,
    payload : params
  };
}

export function prepareAllVisions() {
  return {
    type: C.ALL_VISION_LIST_LOADING,
    payload : {}
  };
}

export function preContribution(params) {
  return {
    type: C.SAVE_CONTRIBUTION_LOADING,
    payload : params
  };
}

export function preHistory(params) {
  return {
    type: C.VISION_HISTORY_LOADING,
    payload : params
  };
}

export function preContent(params) {
  return {
    type: C.VISION_FS_LOADING,
    payload : params
  };
}

export function preBranch(params) {
  return {
    type: C.BRANCH_LIST_LOADING,
    payload : params
  };
}

export function saveBranch(params) {
  return {
    type: C.SAVE_BRANCH,
    payload: params
  };
}

export function preRead(params) {
  return {
    type: C.FILE_READ_LOADING,
    payload : params
  };
}

export function preStat(params) {
  return {
    type: C.VISION_STAT_LOADING,
    payload : params
  };
}

export function preLike(params) {
  return {
    type: C.VISION_USER_LIKE,
    payload : params
  };
}

export function unregister(params) {
  return {
    type: C.VISION_UNREGISTER_USER,
    payload : params
  };
}

export function visionSaved(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    visionId : response.db._id,
  };
}

export function saveContribution(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    commitId : response.internal,
  };
}

export function saveLike(res) {
  const response = res.data.response;

  return {
    type: C.SAVE_USER_LIKE,
    likedVisionId: response._id,
    add: response.add
  };
}

export function showVisionList(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    visionList : response,
  };
}

export function showAllVisionList(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    allVisionList : response,
  };
}

export function showHistoryList(res) {
  const response = res.data.response;
  return {
    type: C.DUPLICATE_VISION_ACTION,
    historyList : response,
  };
}

export function showContentList(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    visionFS : response,
  };
}

export function showBranchList(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    branchList : response,
  };
}

export function fileContent(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    ContentString : response,
  };
}

export function getVisionStats(res) {
  const response = res.data.response;

  return {
    type: C.DUPLICATE_VISION_ACTION,
    contributionStats : response,
  };
}
