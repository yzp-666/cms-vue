<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
      <el-form-item label="产品图片" prop="images" :label-width="formLabelWidth">
        <upload-imgs ref="uploadEle" :value="form.images" />
      </el-form-item>
      <el-form-item label="产品编号" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit" :label-width="formLabelWidth">
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="幅宽" prop="width" :label-width="formLabelWidth">
        <el-input v-model="form.width"></el-input>
      </el-form-item>
      <el-form-item label="克重" prop="weight" :label-width="formLabelWidth">
        <el-input v-model="form.weight"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.remark"></el-input>
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
import UploadImgs from '@/component/base/upload-image/index'

export default {
  components: {
    UploadImgs,
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
      form: {
        images: [],
      },
      url: {
        add: '/v1/supplier', // post
        edit: '/v1/supplier', // put '/:id'
      },
    }
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
  },
}
</script>

<style scoped></style>
