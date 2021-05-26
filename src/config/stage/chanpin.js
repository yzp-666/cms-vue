const chanpinRouter = {
  route: null,
  name: null,
  title: '产品',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-chanpin',
  filePath: 'view/chanpin/', // 文件路径
  order: 6,
  inNav: true,
  permission: ['查询产品列表'],
  children: [
    {
      title: '产品列表',
      type: 'view',
      name: 'Chanpin',
      route: '/chanpin/list',
      filePath: 'view/chanpin/chanpin-list.vue',
      inNav: true,
      icon: 'iconfont icon-chanpin',
    },
  ],
}

export default chanpinRouter
