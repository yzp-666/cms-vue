const demoRouter = {
  route: null,
  name: null,
  title: 'demo',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/demo/', // 文件路径
  order: 3,
  inNav: true,
  children: [
    {
      title: 'demo列表',
      type: 'view',
      name: 'Demo',
      route: '/demo/list',
      filePath: 'view/demo/demo-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default demoRouter
