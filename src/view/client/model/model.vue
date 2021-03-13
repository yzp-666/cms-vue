<template>
  <div>
    <!--    表单-->
    <el-dialog :title="title" :visible.sync="dialogFormVisible" :before-close="handleClose" width="60%">
      <el-form :model="form">
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户类型" :label-width="formLabelWidth">
          <div class="client_type">
            <el-select size="medium" v-model="form.type" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"> </el-option>
            </el-select>
            <el-button @click="getClientTypeList" style="margin-left: 10px">搜索</el-button>
            <l-icon :name="'plus-circle'" :color="'#3963bc'" style="margin-left: 10px" @click="showClientType"></l-icon>
          </div>
        </el-form-item>
      </el-form>

      <!--  添加客户属性  -->
      <el-dialog width="50%" title="客户类型" :visible.sync="clientTypeVisible" append-to-body>
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
  props: ['dialogFormVisible', 'title'],
  data() {
    return {
      // dialogFormVisible: false,
      form: {
        name: '',
        type: '',
      },
      options: [],
      clientTypeVisible: false,
      formLabelWidth: '120px',
      inputVisible: false,
      inputValue: '',
    }
  },
  async created() {
    await this.getClientTypeList()
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
    /**
     * 验证参数
     * 提交
     * 判断是否成功 success关闭 error 提示
     */
    async submit() {
      console.log(this.form) // 验证参数
      try {
        const create = await client.createClient(this.form)
        console.log(create)
        this.$message.success(create.message)
        this.$emit('close')
      } catch (e) {
        this.$message.error('客户添加失败，请检测填写信息')
      }
    },
    /**
     * 获取客户类型列表
     */
    async getClientTypeList() {
      const clientTypeList = await client.getClientTypeList()
      console.log(clientTypeList)
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
.el-tag-content {
  display: flex;
  flex-flow: wrap;
  justify-content: flex-start;
  align-items: center;
}
.el-tag {
  height: 32px;
  line-height: 30px;
  margin-left: 10px;
  margin-bottom: 10px;
}
.el-tag-content > .el-button {
  margin-bottom: 10px;
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
