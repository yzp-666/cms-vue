<template>
  <!--  添加客户地址  -->
  <el-dialog width="38%" title="客户地址" :visible.sync="addressVisible" :before-close="handleClose" append-to-body>
    <div>
      <el-button v-if="addressList.length < 5" type="primary" @click="modelVisible = true" style="margin-right: 15px"
        >添加地址</el-button
      >
      <span>注: 每个客户最多只能添加五个地址</span>
    </div>
    <div class="address-list">
      <div class="address-item" v-for="item in addressList" :key="item.id">
        公司名称：{{ item.firm_name }}<br />
        详细地址：{{ item.address }}<br />
        联系人: {{ item.linkman }}<br />
        联系电话：{{ item.link_phone }}<br />
        备注：{{ item.remark }}<br />
      </div>
    </div>

    <el-dialog
      width="38%"
      :title="modelTitle"
      :visible.sync="modelVisible"
      :before-close="handleModelClose"
      append-to-body
    >
      <el-form :model="form" ref="form" size="mini" style="padding: 0 30px">
        <el-form-item label="公司名称" prop="firm_name" :label-width="formLabelWidth">
          <el-input v-model="form.firm_name"></el-input>
        </el-form-item>
        <el-form-item label="省/市/区(县)" prop="address" :label-width="formLabelWidth">
          <el-cascader v-model="form.address" :options="options" :props="props" style="width: 100%"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="addressDetail" :label-width="formLabelWidth">
          <el-input v-model="form.addressDetail"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="linkman" :label-width="formLabelWidth">
          <el-input v-model="form.linkman"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话" prop="link_phone" :label-width="formLabelWidth">
          <el-input v-model="form.link_phone"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.remark"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleModelClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

    <div slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import address from '@/model/address' // api
import pca from './pca-code.json'

export default {
  props: ['addressVisible', 'id'],
  data() {
    return {
      modelTitle: '新增地址',
      modelVisible: false,
      addressList: [],
      formLabelWidth: '100px',
      form: {
        firm_name: '',
        address: '',
        addressDetail: '',
        linkman: '',
        link_phone: '',
        remark: '',
      },
      props: { label: 'name', value: 'name', expandTrigger: 'hover' },
    }
  },
  computed: {
    options() {
      return pca
    },
  },
  methods: {
    // 获取客户地址列表
    async loadData() {
      const data = await address.getAddressListk(this.id)
      console.log(data)
      this.addressList = data
    },
    // 添加地址
    async create() {
      // TODO添加表单验证
      const data = JSON.parse(JSON.stringify(this.form))
      data.address = data.address ? `${data.address.join(',')} ${data.addressDetail}` : ''
      data.user_id = this.id
      delete data.addressDetail
      console.log(data)
      try {
        await address.create(data)
      } catch (e) {
        this.$message.error(e.message)
      }
      return data
    },
    // 删除地址
    // 编辑地址

    // 关闭地址列表
    handleClose() {
      this.$emit('handleAddressClose')
    },
    // 地址列表确认
    confirm() {
      this.$emit('AddressConfirm')
    },
    // form确认
    async submit() {
      await this.create() // 创建地址 通过后 触发获取地址列表
      await this.loadData()
      this.modelVisible = false
    },
    // form关闭
    handleModelClose() {
      this.modelVisible = false
    },
  },
}
</script>

<style scoped></style>
