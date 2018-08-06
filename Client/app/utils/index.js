import moment from 'moment';

const hasNumber = str => /\d/.test(str);

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
  const pathMapping = {
    '/app/vision/list' : [],
    '/app/feedback': [{ link: '/app/feedback', label: 'Feedback' }],
    '/app/user/profile': [{ link: '/app/user/profile', label: 'Profile' }],
    '/app/discover': [{ link: '/app/discover', label: 'Discover' }],
    '/app/vision/edit': [{ link: null, label: 'Vision Edit' }],
    '/app/mail': [{ link: '/app/mail', label: 'Chat' }],
    '/app/vision/content': [{ link: null, label: 'Files' }],
    '/app/vision/lab': [
        { link: null, 
          label: 'Vision Page', 
          format: () => {
            const filtered = path.split('/').filter(p => hasNumber(p));
            if (filtered.length > 0) {
              return `/app/vision/${filtered[0]}/content`;
            }
            return null;
          },
        }, 
        { link: null, label: 'Vision Lab' }
    ],
    '/app/vision/summary': [{ link: null, label: 'Vision Page' }],
  }; 
  return pathMapping[filteredPath] || [];
}
