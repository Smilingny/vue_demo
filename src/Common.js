//获取
export function getSessionStorage(keyStr){
    let str = sessionStorage.getItem(keyStr);
    if (str === '' || str == null || str === 'null' || str === undefined) {
        return null;
    }else{
        return JSON.parse(str);
    }
}

//设置
export function setSessionStorage(keyStr, value) {
    sessionStorage.setItem(keyStr,JSON.stringify(value));
}

//从sessionStorage中移除一个JSON对象
export function removeSessionStorage(keyStr) {
    sessionStorage.removeItem(keyStr);
}

//获取当前时间（XXXX-XX-XX）
export function getCurDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    return year + "-" + month + "-" + day;
}
