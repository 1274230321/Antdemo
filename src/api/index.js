// import jsonp from "jsonp";
import  ajax  from "./ajax";


// login
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
//weather
export const reqWeather = (version, city, appid, appsecret) => ajax('https://www.tianqiapi.com/api/',{version, city, appid, appsecret})
//category
export const reqCategory = (parentId) => ajax('/manage/category/list', {parentId})
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')

