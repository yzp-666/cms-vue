<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">产品列表</div></div>
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
                新增产品
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
      >
        <template v-slot:unit>
          <el-table-column label="单位" width="" v-slot="{ row }">
            {{ row.unit == 1 ? 'kg' : 'm' }}
          </el-table-column>
        </template>
      </lin-table>
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
        { prop: 'image', label: '图片' },
        { prop: 'name', label: '产品名称' },
        { prop: 'unit', slot: 'unit' },
        { prop: 'price', label: '参考售价/元' },
        { prop: 'remark', label: '备注' },
      ],
      operate: [],
      url: {
        list: '/v1/product',
        delete: '/v1/product/delete',
      },
    }
  },
  created() {
    this.operate = [
      { name: '颜色', func: 'handleSet', type: 'primary' },
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除产品',
      },
    ]
  },
  methods: {
    handleSet() {
      // 跳转颜色
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
