import cookie from 'js-cookie';

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

export function saveUserData(data){
    cookie.set('signedIn' , 1);
    cookie.set('_id' , data._id);
    cookie.set('fullName' , data.fullName);
    cookie.set('email' , data.email);
}


export function getAllCookies(data){
    return cookie.get();
}

export function formatDate(date){
    var dateObj = new Date(date);
    
    var y = dateObj.getFullYear(),
     m = dateObj.getMonth() + 1, // month is 0-indexed
     d = dateObj.getDate();

    return y
     + "-" + (m < 10 ? "0" + m : m)
     + "-" + (d < 10 ? "0" + d : d);
}
