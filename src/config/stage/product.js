const clientRouter = {
  route: null,
  name: null,
  title: '产品管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-team',
  filePath: 'view/product/', // 文件路径
  order: 7,
  inNav: true,
  children: [
    {
      title: '产品列表',
      type: 'view',
      name: 'product',
      route: '/product/list',
      filePath: 'view/product/product-list.vue',
      inNav: true,
      icon: 'iconfont icon-team',
      permission: ['查询所有产品'],
    },
  ],
}

export default clientRouter
