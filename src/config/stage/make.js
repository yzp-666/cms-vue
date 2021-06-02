const makeRouter = {
  route: null,
  name: null,
  title: '加工单',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-jiagongguanli',
  filePath: 'view/make-ticket/', // 文件路径
  order: 11,
  inNav: true,
  permission: ['查询加工单列表'],
  children: [
    {
      title: '加工单',
      type: 'view',
      name: 'Make',
      route: '/make/list',
      filePath: 'view/make-ticket/make-list.vue',
      inNav: true,
      icon: 'iconfont icon-jiagongguanli',
    },
  ],
}

export default makeRouter
