export const globalPageSize = 5;

export function getRandomString() {
    return Math.random().toString(36).substring(2, 15);
}

export function saveUserData(serverResponse) {
    localStorage.setItem('token', serverResponse.token);
    localStorage.setItem('email', serverResponse.email);
    localStorage.setItem('fullName', serverResponse.fullName);
}

export function logout() {
  localStorage.clear();
  window.location.reload();
}

export function formatDate(date) {
    if (date) {
      const dateObj = new Date(date);
      const y = dateObj.getFullYear(),
      m = dateObj.getMonth() + 1,
      d = dateObj.getDate();

      return `${y
       }-${m < 10 ? `0${m}` : m
       }-${d < 10 ? `0${d}` : d}`;
    }
    return '';
}
