<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
      <el-form-item label="名字" prop="name" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
        <el-radio-group :disabled="disableSubmit" v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="2">不详</el-radio>
        </el-radio-group>
        <!--        <el-select v-model="form.unit" placeholder="">-->
        <!--          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>-->
        <!--        </el-select>-->
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
      url: {
        add: '/v1/demo', // post
        edit: '/v1/demo', // put '/:id'
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
