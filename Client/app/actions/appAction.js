import {
  APP_MENU_CHANGE
} from 'constants/appConstants';

export function changeMenuItems(newMenu) {
  return {
    type: APP_MENU_CHANGE,
    status : false,
    menuContent : newMenu
  };
}
