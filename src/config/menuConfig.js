const menuList = [{
    title: 'Home',  key: '/home', icon: 'home',
}, {
    title: 'Products',
    key: '/products',
    icon: 'appstore', children: [ // 子菜单列表
        {
            title: 'Category', key: '/category', icon: 'bars'
        }, {
            title: 'Goods', key: '/product', icon: 'tool'
        },]
}, {
    title: 'User', key: '/user', icon: 'user'
}, {
    title: 'Role', key: '/role', icon: 'safety',
}, {

    title: 'Charts', key: '/charts', icon: 'area-chart', children: [
        {
            title: 'Bar', key: '/charts/bar', icon: 'bar-chart'
        }, {
            title: 'Line', key: '/charts/line', icon: 'line-chart'
        }, {
            title: 'Pie',
            key: '/charts/pie', icon: 'pie-chart'
        },]
},]
export default menuList