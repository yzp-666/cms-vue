<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">供应商列表</div></div>
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
              <el-button type="primary" @click="handleAdd">
                新增供应商
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
        v-loading="loading"
        :pagination="pagination"
        @handleSizeChange="handleSizeChange"
        @currentChange="currentChange"
      ></lin-table>
    </div>
    <modal-form ref="modalForm" @ok="modalFormOk"></modal-form>
  </div>
</template>

<script>
import { JeecgListMixin } from '@/mixins/JeecgListMixin'
import LinTable from '@/component/base/table/lin-table'
import modalForm from './model/modalForm'

export default {
  mixins: [JeecgListMixin],
  components: {
    LinTable,
    modalForm,
  },
  data() {
    return {
      tableColumn: [
        { prop: 'name', label: '供应商名称' },
        { prop: 'phone', label: '电话' },
        { prop: 'htje', label: '合同金额' },
        { prop: 'ysh', label: '已送货' },
        { prop: 'yshk', label: '预收货款' },
        { prop: 'wshk', label: '未收货款' },
        { prop: 'okhk', label: '已收货款' },
      ],
      operate: [],
      url: {
        list: '/v1/supplier',
        delete: '/v1/supplier/delete',
      },
    }
  },
  created() {
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除供应商',
      },
    ]
  },
  methods: {},
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
