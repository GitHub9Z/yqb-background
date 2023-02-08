export default {
  path: '/',
  component: '@/layouts/index',
  name: '后台管理',
  routes: [{
    name: '基本信息',
    path: '/index',
    icon: 'HomeOutlined',
    component: '@/pages/home/index'
  }, {
    name: '合约管理',
    path: '/protocal',
    icon: 'GitlabOutlined',
    hideChildrenInMenu: true,
    routes: [{
      path: './',
      component: '@/pages/protocal/index',
    }, {
      path: './promise/:id',
      name: '签约列表',
      component: '@/pages/protocal/pages/promise/index'
    }]
  }, {
    name: '门店管理',
    path: '/shop',
    icon: 'GitlabOutlined',
    component: '@/pages/shop/index'
  }, {
    name: '用户管理',
    path: '/user',
    icon: 'GitlabOutlined',
    component: '@/pages/user/index'
  }, {
    name: '券码管理',
    path: '/vouchers',
    icon: 'GitlabOutlined',
    hideChildrenInMenu: true,
    routes: [{
      path: './',
      component: '@/pages/vouchers/index',
    }, {
      path: './voucher/:id',
      name: '券码列表',
      component: '@/pages/vouchers/pages/voucher/index'
    }]
  }, {
    name: '设置中心',
    path: '/setting',
    icon: 'GitlabOutlined',
    component: '@/pages/setting/index'
  }, {
    path: '/login',
    component: '@/pages/login/index'
  }]
}
