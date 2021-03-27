import { get, _delete } from '@/lin/plugin/axios' // 请求方法
import { filterObj } from '@/utils/util'

// eslint-disable-next-line import/prefer-default-export
export const JeecgListMixin = {
  data() {
    return {
      /* 查询条件-请不要在queryParam中声明非字符串值的属性 */
      queryParam: {},
      /* 数据源 */
      tableData: [],
      /* 分页参数 */
      pagination: {
        pageSize: 10,
        pageTotal: 0, // 总数
        currentPage: 1,
        pageSizes: [10, 15, 20, 50],
      },
      /* table加载状态 */
      loading: false,
      /* 排序参数 */
      isorter: '',
      /* 筛选参数 */
      filters: '',
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData(arg) {
      if (!this.url.list) {
        this.$message.error('请设置url.list属性!')
        return
      }
      // 加载数据 若传入参数1则加载第一页的内容
      if (arg === 1) {
        this.pagination.currentPage = 1
      }
      const params = this.getQueryParams() // 查询条件
      this.loading = true
      get(this.url.list, params).then(res => {
        this.tableData = res.rows
        this.pagination.pageTotal = res.count
        this.loading = false
      })
    },
    // 条数改变
    handleSizeChange(val) {
      this.$set(this.pagination, 'pageSize', val)
      this.loadData()
    },
    // 页数改变
    currentChange(page) {
      console.log(page)
      this.$set(this.pagination, 'currentPage', page)
      this.loadData()
    },
    // 编辑
    handleEdit(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '编辑'
      this.$refs.modalForm.disableSubmit = false
      // this.showEdit = true
      // this.modelStatus = 'edit'
      // this.editClientID = val.row.id
    },
    // 添加
    handleAdd() {
      this.$refs.modalForm.add()
      this.$refs.modalForm.title = '新增'
      this.$refs.modalForm.disableSubmit = false
    },
    // 查看
    handleLook(record) {
      this.$refs.modalForm.edit(record)
      this.$refs.modalForm.title = '查看'
      this.$refs.modalForm.disableSubmit = true
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await _delete(this.url.delete, val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.loadData()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    getQueryParams() {
      // 获取查询条件
      const sqp = {}
      if (this.superQueryParams) {
        sqp.superQueryParams = this.superQueryParams
      }
      const param = Object.assign(sqp, this.queryParam, this.isorter, this.filters)
      param.currentPage = this.pagination.currentPage
      param.pageSize = this.pagination.pageSize
      return filterObj(param)
    },
    modalFormOk() {
      // 新增/修改 成功时，重载列表
      this.loadData()
    },
  },
}
