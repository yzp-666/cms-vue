<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">demo列表</div></div>
      <!-- 顶部按钮-->
      <div class="header-handle">
        <el-button type="primary" @click="loadData" icon="el-icon-search">搜索</el-button>

        <el-button type="primary" @click="handleAdd" icon="el-icon-plus">新增</el-button>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        :border="true"
        :index="1"
        :type="'selection'"
        :cellStyle="cellStyle"
        :headerCellStyle="headerCellStyle"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @goToGroupEditPage="goToGroupEditPage"
        v-loading="loading"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @currentChange="currentChange"
      >
        <!--        :highlightCurrentRow="true"-->
        <template v-slot:sex>
          <el-table-column label="性别" width="150" v-slot="{ row }">
            {{ row.sex == 1 ? '男' : row.sex == 0 ? '女' : '不详' }}
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
import { JeecgListMixin } from '@/mixins/JeecgListMixin'

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
      tableColumn: [{ prop: 'name', label: '名字' }, { prop: 'phone', label: '电话' }, { prop: 'sex', slot: 'sex' }],
      operate: [],
      url: {
        list: '/v1/demo',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.operate = [
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
