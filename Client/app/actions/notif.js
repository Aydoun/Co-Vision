import {
  NOTIFY_ACTION
} from 'constants/notif';

export function notify(notificationObj) {
  return {
    type: NOTIFY_ACTION,
    status: notificationObj.status,
    message: notificationObj.message
  };
}
