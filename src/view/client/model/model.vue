<template>
  <div>
    <!--    表单-->
    <el-dialog
      :title="status === 'creact' ? '创建客户' : '编辑客户'"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="30%"
    >
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
        <el-form-item label="备用电话" prop="byphone" :label-width="formLabelWidth">
          <el-input v-model="form.byphone"></el-input>
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

      <!--  添加客户属性  -->
      <el-dialog width="36%" title="客户类型" :visible.sync="clientTypeVisible" append-to-body>
        <div class="el-tag-content">
          <el-tag
            :key="tag.value"
            v-for="tag in options"
            closable
            :disable-transitions="false"
            @close="handleInputClose(tag.value)"
          >
            {{ tag.label }}
          </el-tag>
          <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">添加类型</el-button>
        </div>
      </el-dialog>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import client from '@/model/client' // api

export default {
  props: ['dialogFormVisible', 'id', 'row', 'status'],
  data() {
    return {
      // dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        typeId: '',
        htje: '',
        phone: '',
        byPhone: '',
        email: '',
        remark: '',
        addressIds: '',
      },
      options: [],
      clientTypeVisible: false,
      formLabelWidth: '100px',
      inputVisible: false,
      inputValue: '',
    }
  },
  async created() {
    await this.getClientTypeList()
  },
  watch: {
    dialogFormVisible(val) {
      if (val && this.status === 'edit') {
        this.getDetails()
      }
    },
  },
  methods: {
    handleClose() {
      // console.log('close')
      this.$refs.form.resetFields()
      this.$emit('close')
    },

    // 获取客户信息
    async getDetails() {
      try {
        const res = await client.getDetails(this.id)
        this.$nextTick(() => {
          this.form = JSON.parse(JSON.stringify(res))
        })
      } catch (e) {
        this.$message.success(e.message)
        this.handleClose()
      }
    },

    /**
     * 验证参数
     * 提交
     * 判断是否成功 success关闭 error 提示
     */
    async submit() {
      console.log(this.form) // 验证参数
      try {
        if (this.status === 'create') {
          console.log('create')
          const create = await client.createClient(this.form)
          this.$message.success(create.message)
          this.handleClose()
        } else if (this.status === 'edit') {
          console.log('edit')
          console.log(this.id)
          console.log(this.form)
          const edit = await client.editClient(this.id, this.form)
          this.$message.success(edit.message)
          this.handleClose()
        }
      } catch (e) {
        console.log(e)
        this.$message.error('客户添加失败，请检测填写信息')
      }
    },
    /**
     * 获取客户类型列表
     */
    async getClientTypeList() {
      const clientTypeList = await client.getClientTypeList()
      this.options = clientTypeList
    },
    showClientType() {
      this.clientTypeVisible = true
    },

    // 展示添加框
    showInput() {
      this.inputVisible = true
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    // 添加客户类型
    async handleInputConfirm() {
      try {
        const { inputValue } = this
        // 提交数据
        if (inputValue) {
          const data = await client.createClientType({ name: inputValue })
          this.getClientTypeList()
          this.$message.success(data.message)
          this.inputVisible = false
          this.inputValue = ''
        }
      } catch (e) {
        this.$message.error('添加失败')
      }
    },

    // 删除客户类型
    handleInputClose(id) {
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await client.deleteClientType(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getClientTypeList()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
  },
}
</script>

<style scoped>
.client_type {
  display: flex;
  align-items: center;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  height: 32px;
  margin-left: 10px;
  margin-bottom: 10px;
  vertical-align: bottom;
}
</style>
