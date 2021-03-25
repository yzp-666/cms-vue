<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">客户列表</div></div>
      <div class="handle">
        <el-row :gutter="20">
          <el-col :span="16">
            <div class="el-row-left">
              <el-button type="primary" icon="el-icon-search" @click="loadData">
                搜索
              </el-button>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="el-row-right">
              <el-button type="primary" @click="create">
                新增客户
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @currentChange="currentChange"
      ></lin-table>
    </div>
    <!-- 编辑弹框 -->
    <creat-model
      :dialogFormVisible="showEdit"
      :status="modelStatus"
      :id="editClientID"
      @close="editClose"
    ></creat-model>
  </div>
</template>

<script>
import client from '@/model/client' // api
import LinTable from '@/component/base/table/lin-table'
import CreatModel from './model/model'

export default {
  components: {
    LinTable,
    CreatModel,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'name', label: '客户名称' },
        { prop: 'phone', label: '电话' },
        { prop: 'htje', label: '合同金额' },
        { prop: 'ysh', label: '已送货' },
        { prop: 'yshk', label: '预收货款' },
        { prop: 'wshk', label: '未收货款' },
        { prop: 'okhk', label: '已收货款' },
      ],
      pagination: {
        pageSize: 10,
        pageTotal: 0, // 总数
        currentPage: 1,
        pageSizes: [10, 15, 20, 50],
      },
      tableData: [],
      operate: [],
      showEdit: false,
      editBookID: 1,
      dialogFormVisible: false,
      modelStatus: 'create',
      editClientID: '',
    }
  },
  async created() {
    await this.loadData()
    debugger
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除客户',
      },
    ]
  },
  methods: {
    async loadData() {
      this.loading = true
      const pagination = {
        pageSize: this.pagination.pageSize,
        currentPage: this.pagination.currentPage,
      }
      try {
        const clients = await client.getList(pagination)
        this.tableData = clients.rows
        this.pagination.pageTotal = clients.count
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
      this.loading = false
    },
    // 条数改变
    handleSizeChange(val) {
      console.log(val)
      this.$set(this.pagination, 'pageSize', val)
      this.loadData()
    },
    // 页数改变
    currentChange(page) {
      console.log(page)
      this.$set(this.pagination, 'currentPage', page)
      this.loadData()
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await client.deleteClient(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.loadData()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    create() {
      this.showEdit = true
      this.modelStatus = 'create'
    },
    // 编辑
    handleEdit(val) {
      this.showEdit = true
      this.modelStatus = 'edit'
      this.editClientID = val.row.id
    },
    // 关闭编辑
    editClose() {
      this.showEdit = false
      this.loadData()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
