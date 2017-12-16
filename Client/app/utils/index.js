import moment from 'moment';

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
