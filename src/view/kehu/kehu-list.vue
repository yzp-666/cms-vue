<template>
  <div class="container">
    <!-- 列表页面 -->
    <div class="header"><div class="title">客户列表</div></div>
    <!--搜索表单-->
    <el-form size="small" ref="queryForm" :inline="true" :model="queryParam" class="demo-form-inline">
      <el-form-item label="客户名">
        <el-input v-model="queryParam.name" placeholder="客户名"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="queryParam.phone" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item label="客户类型">
        <el-select v-model="queryParam.type" placeholder="客户类型">
          <el-option label="服装" value="1"></el-option>
          <el-option label="二批" value="2"></el-option>
          <el-option label="制衣厂" value="3"></el-option>
        </el-select>
      </el-form-item>
      <!--      <el-form-item label="状态">-->
      <!--        <el-input v-model="queryParam.state" placeholder="状态"></el-input>-->
      <!--      </el-form-item>-->
    </el-form>
    <!-- 顶部按钮-->
    <div class="header-handle">
      <div class="handle-left">
        <el-button type="primary" icon="el-icon-search" @click="onSubmit">搜索</el-button>
        <el-button type="primary" icon="el-icon-refresh" @click="resetForm('queryForm')">重置</el-button>
      </div>
      <div class="handle-right">
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
      v-loading="loading"
      :pagination="pagination"
      @handleSizeChange="handleSizeChange"
      @currentChange="currentChange"
    >
      <!-- @goToGroupEditPage="goToGroupEditPage"-->
      <!-- :highlightCurrentRow="true"    -->
      <template v-slot:wfkje>
        <el-table-column label="未付款" width="150" v-slot="{ row }">
          {{ wfkje(Number(row.yfhje), Number(row.yfkje)) }}
        </el-table-column>
      </template>
    </lin-table>

    <model-form ref="modalForm" @ok="modalFormOk"></model-form>
  </div>
</template>

<script>
import LinTable from '@/component/base/table/lin-table'
import ModelForm from './model/model-form'
import JeecgListMixin from '@/mixins/JeecgListMixin'
// import { get } from '@/lin/plugin/axios'
import { accSub } from '@/utils/util'

export default {
  components: {
    LinTable,
    ModelForm,
  },
  mixins: [JeecgListMixin],
  data() {
    return {
      name: '客户列表页面',
      cellStyle: { 'text-align': 'center' },
      headerCellStyle: { 'text-align': 'center' },
      tableColumn: [
        { prop: 'name', label: '客户名' },
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
  async mounted() {
    this.loading = true
    this.operate = [
      { name: '查看', func: 'handleSee', type: 'primary' },
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      // { name: '跳转', func: 'goToGroupEditPage', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除客户',
      },
    ]
    this.loading = false
  },
  methods: {
    // goToGroupEditPage(row, index) {
    //   console.log(row, index)
    // },
    wfkje(r1, r2) {
      return accSub(r1, r2)
    },
  },
}
</script>

<style lang="scss" scoped>
@import 'src/assets/style/base.scss';
</style>
