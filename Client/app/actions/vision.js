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
  VISION_LIST_LOADING,
  VISION_UNREGISTER_USER,
  VISION_USER_LIKE,
  SAVE_USER_LIKE,
  SAVE_BRANCH
} from 'constants/vision';
import { DISCOVER_LIKE_VISION } from 'constants/discover';


export function prepareSaving(params) {
  return {
    type: VISION_SAVE_LOADING,
    payload : params
  };
}

export function prepareListing(params) {
  return {
    type: VISION_LIST_LOADING,
    payload : params
  };
}

export function prepareAllVisions() {
  return {
    type: ALL_VISION_LIST_LOADING,
    payload : {}
  };
}

export function preContribution(params) {
  return {
    type: SAVE_CONTRIBUTION_LOADING,
    payload : params
  };
}

export function preHistory(params) {
  return {
    type: VISION_HISTORY_LOADING,
    payload : params
  };
}

export function preContent(params) {
  return {
    type: VISION_FS_LOADING,
    payload : params
  };
}

export function preBranch(params) {
  return {
    type: BRANCH_LIST_LOADING,
    payload : params
  };
}

export function saveBranch(params) {
  return {
    type: SAVE_BRANCH,
    payload: params
  };
}

export function preRead(params) {
  return {
    type: FILE_READ_LOADING,
    payload : params
  };
}

export function preStat(params) {
  return {
    type: VISION_STAT_LOADING,
    payload : params
  };
}

export function preLike(params) {
  return {
    type: VISION_USER_LIKE,
    payload : params
  };
}

export function unregister(params) {
  return {
    type: VISION_UNREGISTER_USER,
    payload : params
  };
}

export function visionSaved(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    visionId : response.db._id,
  };
}

export function saveContribution(res) {
  const response = res.data.response;

  return {
    type: DUPLICATE_VISION_ACTION,
    commitId : response.internal,
  };
}

export function saveLike(res) {
  const response = res.data.response;

  return {
    type: SAVE_USER_LIKE,
    likedVisionId: response._id
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
