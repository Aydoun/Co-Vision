import {
  APP_MENU_CHANGE,
  UPDATE_NOTIFCATION,
} from 'constants/app';

export function changeMenuItems(newMenu) {
  return {
    type: APP_MENU_CHANGE,
    status : false,
    menuContent : newMenu
  };
}

export function showNotification(data) {
  return {
    type: UPDATE_NOTIFCATION,
    data,
  };
}
