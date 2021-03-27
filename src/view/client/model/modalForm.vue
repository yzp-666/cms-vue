<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
      <el-form-item label="客户名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="typeId" :label-width="formLabelWidth">
        <div class="client_type">
          <el-select v-model="form.typeId" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
          </el-select>
          <l-icon :name="'plus-circle'" :color="'#3963bc'" style="margin-left: 10px" @click="showClientType"></l-icon>
        </div>
      </el-form-item>
      <el-form-item label="期初欠款" prop="htje" :label-width="formLabelWidth">
        <el-input v-model="form.htje"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="备用电话" prop="byPhone" :label-width="formLabelWidth">
        <el-input v-model="form.byPhone"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="fax" :label-width="formLabelWidth">
        <el-input v-model="form.fax"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
    </el-form>

    <client-add-type-model
      :options="options"
      :clientTypeVisible="clientTypeVisible"
      @handleClose="handleTypeModelClose"
      @changeType="changeType"
    ></client-add-type-model>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import client from '@/model/client' // api
import ClientAddTypeModel from './clientAddTypeModel'
import { put, post } from '@/lin/plugin/axios' // 请求方法

export default {
  components: {
    ClientAddTypeModel,
  },
  props: {
    width: {
      type: String,
      default: () => '50%',
    },
  },
  data() {
    return {
      disableSubmit: false,
      title: '新增',
      formLabelWidth: '120px',
      dialogFormVisible: false,
      form: {},
      options: [],
      clientTypeVisible: false,
      url: {
        add: '/v1/supplier', // post
        edit: '/v1/supplier', // put '/:id'
      },
    }
  },
  created() {
    this.getClientTypeList()
  },
  methods: {
    edit(record) {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = Object.assign({}, record.row)
      })
    },
    add() {
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.form = {}
      })
    },
    close() {
      this.$emit('close')
      this.dialogFormVisible = false
    },
    /**
     * 验证参数
     * 提交
     * 判断是否成功 success关闭 error 提示
     */
    async handleOk() {
      // TODO 验证参数
      console.log(this.form)
      const that = this
      const data = JSON.parse(JSON.stringify(this.form))
      data.htje = data.htje ? this.form.htje : '0.00'
      let url = this.url.add
      try {
        if (that.form.id) {
          url = `${that.url.edit}/${that.form.id}`
          put(url, data).then(res => {
            that.$message.success(res.message)
            that.$emit('ok')
          })
        } else {
          post(url, data).then(res => {
            that.$message.success(res.message)
            that.$emit('ok')
          })
        }
      } catch (e) {
        this.$message.error('客户添加失败，请检测填写信息')
      }
    },
    handleTypeModelClose() {
      this.getClientTypeList()
      this.clientTypeVisible = false
    },
    changeType(val) {
      console.log(val)
      this.options = JSON.parse(JSON.stringify(val))
    },
    async getClientTypeList() {
      const clientTypeList = await client.getClientTypeList()
      this.options = clientTypeList
    },
    showClientType() {
      this.clientTypeVisible = true
    },
  },
}
</script>

<style scoped></style>
