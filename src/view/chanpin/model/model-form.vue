<template>
  <el-dialog :title="title" z-index="999" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
      <el-form-item label="产品封面图" prop="surfacePlot" :label-width="formLabelWidth">
        <UploadImgs v-if="form.initData" ref="uploadEle" :min-num="1" :max-num="1" :value="form.initData"> </UploadImgs>
      </el-form-item>
      <el-form-item label="产品名称" placeholder="请输入产品名称" prop="tradeName" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="单位" prop="unit" :label-width="formLabelWidth">
        <el-select placeholder="请选择单位" v-model="form.unit" :disabled="disableSubmit">
          <el-option label="kg" value="1"></el-option>
          <el-option label="码" value="2"></el-option>
          <el-option label="条" value="3"></el-option>
          <el-option label="个" value="4"></el-option>
        </el-select>
        <!--        <el-select v-model="form.unit" placeholder="">-->
        <!--          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>-->
        <!--        </el-select>-->
      </el-form-item>
      <el-form-item label="幅宽克重" prop="widthWeight" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.widthWeight"></el-input>
      </el-form-item>
      <el-form-item label="产品类型" prop="type" :label-width="formLabelWidth">
        <el-select placeholder="请选择产品类型" v-model="form.unit" :disabled="disableSubmit">
          <el-option label="采购类" value="1"></el-option>
          <el-option label="加工类" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="form.type == 1" label="采购价格" prop="price" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="price" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="price" :label-width="formLabelWidth">
        <el-input :disabled="disableSubmit" v-model="form.price"></el-input>
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
        initData: [],
      },
      url: {
        add: '/v1/product', // post
        edit: '/v1/product', // put '/:id'
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
      this.form = { initData: [] }
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
