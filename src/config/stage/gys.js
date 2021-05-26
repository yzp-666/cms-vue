const gysRouter = {
  route: null,
  name: null,
  title: '供应商',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-gongyingshang',
  filePath: 'view/gys/', // 文件路径
  order: 5,
  inNav: true,
  permission: ['查询供应商列表'],
  children: [
    {
      title: '供应商列表',
      type: 'view',
      name: 'Gys',
      route: '/gys/list',
      filePath: 'view/gys/gys-list.vue',
      inNav: true,
      icon: 'iconfont icon-gongyingshang',
    },
  ],
}

export default gysRouter
