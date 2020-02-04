import  ajax  from "./ajax";


// login
export const reqLogin = (username, password) => ajax('/login', {username, password}, 'POST')
//weather
export const reqWeather = (version, city, appid, appsecret) => ajax('https://www.tianqiapi.com/api/',{version, city, appid, appsecret})
//category
export const reqCategory = (parentId) => ajax('/manage/category/list', {parentId})
export const reqAddCategory = (categoryName, parentId) => ajax('/manage/category/add', {categoryName, parentId}, 'POST')
export const reqUpdateCategory = (categoryId, categoryName) => ajax('/manage/category/update', {categoryId, categoryName}, 'POST')
//product
export const reqProduct = (pageNum, pageSize) => ajax('/manage/product/list', {pageNum, pageSize})
export const reqUpdateProductStatus = (productId, status) => ajax('/manage/product/updateStatus', {productId, status},'POST')
export const reqSearchProducts = (pageNum, pageSize, searchType, info) => ajax('/manage/product/search',{pageNum, pageSize, [searchType] : info})
export const reqUploadImage = (image) => ajax('/manage/img/upload',{image},'POST')
export const reqDeleteImage = (name) => ajax('/manage/img/delete',{name},'POST')
export const reqAddOrUpdateProduct = ({_id, name, desc, price, pCategoryId, categoryId, detail, imgs}) => ajax('/manage/product/update',{_id, name, desc, price, pCategoryId, categoryId, detail, imgs},'POST')


