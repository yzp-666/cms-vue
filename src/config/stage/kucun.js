const kucunRouter = {
  route: null,
  name: null,
  title: '库存',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-home',
  filePath: 'view/kucun/', // 文件路径
  order: 12,
  inNav: true,
  permission: ['查询库存列表'],
  children: [
    {
      title: '库存',
      type: 'view',
      name: 'Kucun',
      route: '/kucun/list',
      filePath: 'view/kucun/kucun-list.vue',
      inNav: true,
      icon: 'iconfont icon-home',
    },
  ],
}

export default kucunRouter
