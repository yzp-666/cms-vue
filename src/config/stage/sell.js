const sellRouter = {
  route: null,
  name: null,
  title: '销售单',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-biaoqian',
  filePath: 'view/sell-ticket/', // 文件路径
  order: 7,
  inNav: true,
  permission: ['查询销售单列表'],
  children: [
    {
      title: '销售单',
      type: 'view',
      name: 'Sell',
      route: '/sell/list',
      filePath: 'view/sell-ticket/sell-list.vue',
      inNav: true,
      icon: 'iconfont icon-biaoqian',
    },
  ],
}

export default sellRouter
