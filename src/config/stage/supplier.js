const supplierRouter = {
  route: null,
  name: null,
  title: '供应商管理',
  type: 'folder', // 类型: folder, tab, view
  icon: 'iconfont icon-tushuguanli',
  filePath: 'view/supplier/', // 文件路径
  order: 6,
  inNav: true,
  children: [
    {
      title: '供应商列表',
      type: 'view',
      name: 'supplier',
      route: '/supplier/list',
      filePath: 'view/supplier/supplier-list.vue',
      inNav: true,
      icon: 'iconfont icon-tushuguanli',
    },
  ],
}

export default supplierRouter
