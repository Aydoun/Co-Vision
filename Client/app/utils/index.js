export const globalPageSize = 5;

export function getRandomString(){
    return Math.random().toString(36).substring(2, 15);
}

export function GlobalPagination(list){
    return {
      total : list.length,
      showTotal:(total, range) => `${range[0]}-${range[1]} of ${total} items`,
      pageSize:5
    }
}

export function saveUserData(serverResponse){
    localStorage.setItem('token' , serverResponse.token);
    localStorage.setItem('userId' , serverResponse._id);
    localStorage.setItem('userEmail' , serverResponse.email);
    localStorage.setItem('userfullName' , serverResponse.fullName);
}

export function formatDate(date){
    if (date) {
      var dateObj = new Date(date);

      var y = dateObj.getFullYear(),
      m = dateObj.getMonth() + 1,
      d = dateObj.getDate();
      return y
      + "-" + (m < 10 ? "0" + m : m)
      + "-" + (d < 10 ? "0" + d : d);
    }
    return '';    
}
