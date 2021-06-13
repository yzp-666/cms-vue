<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">客户列表</div></div>
      <!-- 顶部按钮-->
      <div class="header-handle">
        <el-button type="primary" @click="loadData" icon="el-icon-search">搜索</el-button>

        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
        <el-dropdown @command="handleCommand" style="margin-left: 10px">
          <el-button icon="el-icon-arrow-down">
            批量操作
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="delete">批量删除</el-dropdown-item>
            <!--            <el-dropdown-item command="export" >导出</el-dropdown-item>-->
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 表格 -->
      <lin-table
        ref="table"
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        :border="true"
        :index="1"
        :type="'selection'"
        :cellStyle="cellStyle"
        :headerCellStyle="headerCellStyle"
        @handleEdit="handleEdit"
        @handleSee="handleSee"
        @handleDelete="handleDelete"
        @goToGroupEditPage="goToGroupEditPage"
        v-loading="loading"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @currentChange="currentChange"
      >
        <!--    :highlightCurrentRow="true"    -->
        <template v-slot:wfkje>
          <el-table-column label="未付款" width="150" v-slot="{ row }">
            {{ wfkje(Number(row.yfhje), Number(row.yskje)) }}
          </el-table-column>
        </template>
      </lin-table>
    </div>

    <model-form ref="modalForm" @ok="modalFormOk"></model-form>
  </div>
</template>

<script>
import LinTable from '@/component/base/table/lin-table'
import ModelForm from './model/model-form'
import JeecgListMixin from '@/mixins/JeecgListMixin'
import { get } from '@/lin/plugin/axios'
import { accSub } from '@/utils/util'

export default {
  components: {
    LinTable,
    ModelForm,
  },
  mixins: [JeecgListMixin],
  data() {
    return {
      cellStyle: { 'text-align': 'center' },
      headerCellStyle: { 'text-align': 'center' },
      tableColumn: [
        { prop: 'name', label: '名字' },
        { prop: 'phone', label: '电话' },
        { prop: 'jyje', label: '交易金额' },
        { prop: 'yfhje', label: '已送货' },
        { prop: 'ysje', label: '预收款' },
        { prop: 'yfkje', label: '已收款' },
        { prop: 'wfkje', slot: 'wfkje' },
      ],
      operate: [],
      url: {
        list: '/v1/client',
        delete: '/v1/client/delete',
      },
    }
  },
  computed: {
    wfkje(r1, r2) {
      return accSub(r1, r2)
    },
  },
  async mounted() {
    this.loading = true
    this.operate = [
      { name: '查看', func: 'handleSee', type: 'primary' },
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      { name: '跳转', func: 'goToGroupEditPage', type: 'primary' },
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
    goToGroupEditPage(row, index) {
      console.log(row, index)
    },
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
        if (res.rows && Array.isArray(res.rows)) {
          res.rows.forEach((item, index) => {
            item.key = item.id ? item.id : index
          })
        }
        this.tableData = res.rows
        this.pagination.pageTotal = res.count
        this.loading = false
      })
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

  .header-handle {
    margin-bottom: 20px;
  }
}
</style>
