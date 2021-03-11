<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="客户名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
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
      },
      formLabelWidth: '120px',
    }
  },
  methods: {
    close() {
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
  },
}
</script>

<style scoped></style>
