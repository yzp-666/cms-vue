<template>
  <!--  添加客户属性  -->
  <el-dialog width="36%" title="客户类型" :visible.sync="clientTypeVisible" :before-close="handleClose" append-to-body>
    <div class="el-tag-content">
      <el-tag
        :key="tag.value"
        v-for="(tag, index) in data"
        closable
        :disable-transitions="false"
        @close="handleInputClose(tag.value, index)"
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
</template>

<script>
import client from '@/model/client' // api

export default {
  props: ['clientTypeVisible', 'options'],
  data() {
    return {
      inputVisible: false,
      inputValue: '',
      data: [],
    }
  },
  watch: {
    clientTypeVisible() {
      this.data = JSON.parse(JSON.stringify(this.options))
    },
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    // 添加客户类型
    async handleInputConfirm() {
      try {
        const { inputValue } = this
        // 提交数据
        if (inputValue) {
          const data = await client.createClientType({ name: inputValue })
          this.$message.success(data.message)
          this.data.push(data.data)
          this.$emit('changeType', this.data)
          this.inputVisible = false
          this.inputValue = ''
        }
      } catch (e) {
        this.$message.error('添加失败')
      }
    },
    // 删除客户类型
    handleInputClose(id, index) {
      this.$confirm('此操作将永久删除该类型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await client.deleteClientType(id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.data.splice(index, 1)
          this.$emit('changeType', this.data)
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    // 展示添加框
    showInput() {
      this.inputVisible = true
      // eslint-disable-next-line no-unused-vars
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
  },
}
</script>

<style scoped>
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
