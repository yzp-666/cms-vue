<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header"><div class="title">客户列表</div></div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
      ></lin-table>
    </div>

    <!-- 编辑页面 -->
    <client-create v-else @editClose="editClose" :editBookID="editBookID"></client-create>
  </div>
</template>

<script>
import client from '@/model/client' // api
import LinTable from '@/component/base/table/lin-table'
import ClientCreate from './model/create-model' // 编辑弹框

export default {
  components: {
    LinTable,
    ClientCreate,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'khName', label: '客户名称' },
        { prop: 'phone', label: '电话' },
        { prop: 'htje', label: '合同金额' },
        { prop: 'ysh', label: '已送货' },
        { prop: 'yshk', label: '预收货款' },
        { prop: 'wshk', label: '未收货款' },
        { prop: 'okhk', label: '已收货款' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editBookID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getList()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除图书',
      },
    ]
    this.loading = false
  },
  methods: {
    async getList() {
      try {
        const clients = await client.getList()
        this.tableData = clients
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editBookID = val.row.id
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该客户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await client.deleteClient(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getList()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getList()
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
