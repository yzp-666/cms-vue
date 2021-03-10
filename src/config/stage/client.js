const clientRouter = {
  route: null,
  name: null,
  title: '客户管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/book/', // 文件路径
  order: 3,
  inNav: true,
  children: [
    {
      title: '客户列表',
      type: 'view',
      name: 'ClientCreate',
      route: '/client/list',
      filePath: 'view/client/client-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default clientRouter
