<template>
  <el-dialog :title="title" :visible.sync="dialogFormVisible" :width="width">
    <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
      <!--      <el-form-item label="产品图片" prop="images" :label-width="formLabelWidth">-->
      <!--        <upload-imgs ref="uploadEle" :value="form.images" />-->
      <!--      </el-form-item>-->
      <el-form-item label="产品编号" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.code"></el-input>
      </el-form-item>
      <el-form-item label="产品名称" prop="name" :label-width="formLabelWidth">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="计量单位" prop="unit" :label-width="formLabelWidth">
        <el-select v-model="form.unit" placeholder="请选择单位">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="单价/元" prop="unit" :label-width="formLabelWidth">
        <el-input v-model="form.unit"></el-input>
      </el-form-item>
      <el-form-item label="规格" :label-width="formLabelWidth">
        <!--        :prop="'type.' + index + '.value'"-->
        <br />
        <el-row v-for="(type, index) in form.types" :key="type.id" style="margin-bottom: 5px">
          <el-col :span="9">
            <el-row>
              <el-col :span="4">
                <span class="_type">幅宽</span>
              </el-col>
              <el-col :span="16">
                <el-input v-model="type.width"></el-input>
              </el-col>
              <el-col :span="4">
                <span class="_type">cm</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="2"><span class="_type" style="font-size: 16px;color: red;">*</span></el-col>
          <el-col :span="9">
            <el-row>
              <el-col :span="4">
                <span class="_type">克重</span>
              </el-col>
              <el-col :span="16">
                <el-input v-model="type.weight"></el-input>
              </el-col>
              <el-col :span="4">
                <span class="_type">g/m2</span>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="4">
            <div class="_icon">
              <i class="el-icon-circle-plus-outline" title="添加" @click="addType"></i>
              <i
                v-show="form.types.length > 1"
                class="el-icon-remove-outline _delete"
                title="删除"
                @click="deleteType(index)"
              ></i>
            </div>
          </el-col>
        </el-row>

        <!--        <el-input v-model="type.value"></el-input>-->
        <!--        <el-button @click.prevent="removeDomain(domain)">删除</el-button>-->
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
      form: {
        images: [],
        types: [[null, null]],
      },
      url: {
        add: '/v1/supplier', // post
        edit: '/v1/supplier', // put '/:id'
      },
      options: [
        {
          value: 1,
          label: 'kg',
        },
        {
          value: 2,
          label: 'm',
        },
      ],
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
        this.form = {
          images: [],
          types: [
            {
              type_id: 0,
              width: null,
              weight: null,
            },
          ],
        }
      })
    },
    close() {
      this.$emit('close')
      this.dialogFormVisible = false
    },
    addType() {
      const { types } = this.form
      types.push({
        id: types[types.length - 1].id,
        width: null,
        weight: null,
      })
      this.$set(this.form, 'types', JSON.parse(JSON.stringify(types)))
    },
    deleteType(index) {
      const { types } = this.form
      if (this.form.types.length > 1) {
        types.splice(index, 1)
        this.$set(this.form, 'types', JSON.parse(JSON.stringify(types)))
      }
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
