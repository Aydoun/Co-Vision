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
