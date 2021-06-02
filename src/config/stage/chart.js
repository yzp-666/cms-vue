const chartRouter = {
  route: null,
  name: null,
  title: '报表',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-baobiao',
  filePath: 'view/chart/', // 文件路径
  order: 14,
  inNav: true,
  // permission: ['查询demo列表'],
  children: [
    {
      title: '报表',
      type: 'view',
      name: 'Chart',
      route: '/chart/list',
      filePath: 'view/chart/chart-list.vue',
      inNav: true,
      icon: 'iconfont icon-baobiao',
    },
  ],
}

export default chartRouter
