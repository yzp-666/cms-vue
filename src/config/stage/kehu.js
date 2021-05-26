const kehuRouter = {
  route: null,
  name: null,
  title: '客户',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-kehu',
  filePath: 'view/kehu/', // 文件路径
  order: 4,
  inNav: true,
  // permission: ['查询客户列表'],
  children: [
    {
      title: '客户列表',
      type: 'view',
      name: 'Kehu',
      route: '/kehu/list',
      filePath: 'view/kehu/kehu-list.vue',
      inNav: true,
      icon: 'iconfont icon-kehu',
    },
  ],
}

export default kehuRouter
