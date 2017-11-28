export function saveUserData(serverResponse) {
    localStorage.setItem('token', serverResponse.token);
    localStorage.setItem('email', serverResponse.email);
    localStorage.setItem('fullName', serverResponse.fullName);
    localStorage.setItem('userId', serverResponse._id);
}

export function logout() {
  localStorage.clear();
  window.location.reload();
}

export function formatDate(date) {
    if (date) {
      const dateObj = new Date(date);
      const y = dateObj.getFullYear();
      const m = dateObj.getMonth() + 1;
      const d = dateObj.getDate();

      return `${y
       }-${m < 10 ? `0${m}` : m
       }-${d < 10 ? `0${d}` : d}`;
    }
    return '';
}
