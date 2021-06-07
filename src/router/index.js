exports.routes = [
  {
    path: '/login',
    name: '登录页',
    component: 'login',
  },
  // 顺序不能乱，umi react路由不按照严格模式，是按顺序模式
  // 当/ 请求进来时不能匹配/fs就不会进入该router组
  // 如果顺序颠倒，就会出现/fs 匹配/组，进入找不到组件报错
  {
    path: '/fs',
    component: '../layouts/index',
    routes: [
      {
        name: '首页',
        path: '/fs',
        component: './homepage',
      },
      {
        name: '测试',
        path: '/fs/test',
        component: './test/index',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/index',
    routes: [
      {
        name: '首页',
        path: '/',
        component: './homepage',
      },
    ],
  },
];
