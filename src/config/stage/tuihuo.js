const tuihuoRouter = {
  route: null,
  name: null,
  title: '退货单',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tuihuodan',
  filePath: 'view/tuihuo/', // 文件路径
  order: 10,
  inNav: true,
  permission: ['查询退货单'],
  children: [
    {
      title: '退货单',
      type: 'view',
      name: 'Tuihuo',
      route: '/tuihuo/list',
      filePath: 'view/tuihuo/tuihuo-list.vue',
      inNav: true,
      icon: 'iconfont icon-tuihuodan',
    },
  ],
}

export default tuihuoRouter
