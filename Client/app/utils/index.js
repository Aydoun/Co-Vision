import moment from 'moment';

function hasNumber(str) {
  return /\d/.test(str);
}

const pathMapping = {
  '/app/vision/list' : [],
  '/app/feedback': [{ link: '/app/feedback', label: 'Feedback' }],
  '/app/user/profile': [{ link: '/app/user/profile', label: 'User' }],
  '/app/discover': [{ link: '/app/discover', label: 'Discover' }],
  '/app/mail': [{ link: '/app/mail', label: 'Chat' }],
  '/app/vision/content': [{ link: '', label: 'Vision Page' }],
};

export function saveUserData(serverResponse) {
    localStorage.setItem('token', serverResponse.token);
    localStorage.setItem('email', serverResponse.email);
    localStorage.setItem('fullName', serverResponse.fullName);
    localStorage.setItem('userId', serverResponse._id);
    localStorage.setItem('avatar', serverResponse.avatar);
}

export function logout() {
  localStorage.clear();
  window.location.reload();
}

export function formatDate(date) {
    if (date) {
      const dateMoment = moment(date);
      const diffDays = moment(new Date()).diff(dateMoment, 'days');
      const format = diffDays > 0 ? 'YYYY-MM-DD' : 'HH:mm';

      return dateMoment.format(format);
    }
    return '';
}

export function getBreadcrumb(path) {
  const filteredPath = path.split('/').filter(p => !hasNumber(p)).join('/');
  return pathMapping[filteredPath] || [];
}
