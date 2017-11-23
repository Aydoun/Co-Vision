import {
  ERROR_THROWN,
  ERROR_CANCELLED
} from 'constants/errorConstants';

export function reportError(error) {
  return {
    type: ERROR_THROWN,
    status : false,
    errorMessage : error.message
  };
}

export function cancelError() {
  return {
    type: ERROR_CANCELLED,
    status : true,
    errorMessage : ''
  };
}
