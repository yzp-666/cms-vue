const costRouter = {
  route: null,
  name: null,
  title: '费用收入',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-feiyong',
  filePath: 'view/cost/', // 文件路径
  order: 13,
  inNav: true,
  permission: ['查询费用列表'],
  children: [
    {
      title: '费用收入',
      type: 'view',
      name: 'Cost',
      route: '/cost/list',
      filePath: 'view/cost/cost-list.vue',
      inNav: true,
      icon: 'iconfont icon-feiyong',
    },
  ],
}

export default costRouter
