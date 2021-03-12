<template>
  <el-select size="medium" v-model="value" placeholder="请选择">
    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
  </el-select>
</template>

<script>
export default {
  props: ['default', 'type'],
  data() {
    return {
      options: [],
      value: '',
    }
  },
  methods: {
    loadData() {
      // 获取options
      // if (default) { this.value = options[0].value } 默认选中第一项
    },
  },
}
</script>

<style scoped></style>
