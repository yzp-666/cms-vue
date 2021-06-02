const buyTicketRouter = {
  route: null,
  name: null,
  title: '采购单',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-gouwuche',
  filePath: 'view/buy-ticket/', // 文件路径
  order: 8,
  inNav: true,
  permission: ['查询采购列表'],
  children: [
    {
      title: '采购单',
      type: 'view',
      name: 'BuyTicket',
      route: '/buy/list',
      filePath: 'view/buy-ticket/buy-list.vue',
      inNav: true,
      icon: 'iconfont icon-gouwuche',
    },
  ],
}

export default buyTicketRouter
