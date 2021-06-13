<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" :rules="rules" ref="form" size="mini" style="padding: 0 30px">
      <el-form-item label="客户名" prop="name" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="客户类型" prop="type" :label-width="formLabelWidth">
        <!--        <el-radio-group :disabled="disableSubmit" v-model="form.type">-->
        <!--          <el-radio :label="1">服装</el-radio>-->
        <!--          <el-radio :label="2">二批</el-radio>-->
        <!--          <el-radio :label="3">制衣厂</el-radio>-->
        <!--        </el-radio-group>-->
        <el-select v-model="form.type" :disabled="disableSubmit" placeholder="">
          <el-option label="服装" value="1"></el-option>
          <el-option label="二批" value="2"></el-option>
          <el-option label="制衣厂" value="3"></el-option>
          <!--          <el-option-->
          <!--            v-for="item in options"-->
          <!--            :key="item.value"-->
          <!--            :label="item.label"-->
          <!--            :value="item.value">-->
          <!--          </el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="预欠款金额" prop="yqkje" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.yqkje"></el-input>
      </el-form-item>
      <el-form-item label="传真" prop="fax" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.fax"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="site" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.site"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="bz" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.bz"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="handleOk">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import { put, post } from '@/lin/plugin/axios' // 请求方法
// import UploadImgs from '@/component/base/upload-image/index'

export default {
  components: {
    // UploadImgs,
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
      rules: {
        name: [{ required: true, message: '请输入客户名称', trigger: 'blur' }],
      },
      url: {
        add: '/v1/client', // post
        edit: '/v1/client', // put '/:id'
      },
    }
  },
  methods: {
    // 编辑
    edit(record) {
      const data = JSON.parse(JSON.stringify(record))
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs.form.resetFields()
        this.form = Object.assign({}, data.row)
      })
    },
    // 添加
    add() {
      this.dialogFormVisible = true
      this.form = {}
    },
    // 关闭
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
      const that = this
      const data = JSON.parse(JSON.stringify(this.form))
      let url = this.url.add
      try {
        if (that.form.id) {
          url = `${that.url.edit}/${that.form.id}`
          put(url, data).then(res => {
            that.$message.success(res.message)
            that.$emit('ok')
            that.close()
          })
        } else {
          post(url, data).then(res => {
            that.$message.success(res.message)
            that.$emit('ok')
            that.close()
          })
        }
      } catch (e) {
        this.$message.error('添加失败，请检测填写信息')
      }
    },
  },
}
</script>

<style scoped></style>
