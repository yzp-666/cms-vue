<template>
  <!--  添加客户地址  -->
  <el-dialog
    width="50%"
    title="客户地址"
    v-loading="loading"
    :visible.sync="addressVisible"
    :before-close="handleClose"
    append-to-body
  >
    <div>
      <el-button v-if="addressList.length < 5" type="primary" @click="handleModelOpen" style="margin-right: 15px"
        >添加地址</el-button
      >
      <span>注: 每个客户最多只能添加五个地址</span>
    </div>
    <div class="address-list">
      <div class="address-item" v-for="item in addressList" :key="item.id">
        <div class="item-list"><span class="label">公司名称：</span>{{ item.firm_name }}</div>
        <div class="item-list"><span class="label">详细地址：</span>{{ item.address }}</div>
        <div class="item-list">
          <div><span class="label">联系人：</span>{{ item.linkman }}</div>
          <div><span class="label">联系电话：</span>{{ item.link_phone }}</div>
        </div>
        <div class="item-list"><span class="label">备注：</span>{{ item.remark }}</div>
        <div class="handle-but">
          <i class="el-icon-edit" title="编辑" @click="handleEdit(item)"></i>
          <i class="el-icon-delete" title="删除" @click="handleDelete(item.id)"></i>
        </div>
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
          <el-cascader v-model="form.city" :options="options" :props="props" style="width: 100%"></el-cascader>
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
      loading: false,
      form: {
        firm_name: '',
        city: '',
        addressDetail: '',
        linkman: '',
        link_phone: '',
        remark: '',
      },
      props: { label: 'name', value: 'name', expandTrigger: 'hover' },
    }
  },
  watch: {
    addressVisible(val) {
      if (val) {
        this.loadData()
      }
    },
  },
  computed: {
    options() {
      return pca
    },
  },
  async created() {
    await this.loadData()
  },
  methods: {
    // 获取客户地址列表
    async loadData() {
      this.loading = true
      const data = await address.getAddressListk(this.id)
      this.loading = false
      this.addressList = data
    },

    // 地址
    async hadleForm() {
      // TODO添加表单验证
      const data = JSON.parse(JSON.stringify(this.form))
      data.address = data.city ? `${data.city.join(',')} ${data.addressDetail}` : ''
      delete data.addressDetail
      try {
        let res
        if (this.modelTitle === '新增地址') {
          data.user_id = this.id
          res = await address.createAddress(data)
        } else {
          res = await address.editAddress(data.id, data)
        }
        this.$message.success(res.message)
        await this.loadData()
      } catch (e) {
        this.$message.error(e.message)
      }
      return data
    },
    // 删除地址
    // 编辑地址
    handleEdit(row) {
      this.modelTitle = '编辑地址'
      this.modelVisible = true
      const form = JSON.parse(JSON.stringify(row))
      if (form.address) {
        const arr = form.address.split(' ')
        form.address = arr.length > 1 ? arr[0] : ''
        form.city = form.address.split(',')
        delete form.address
        form.addressDetail = arr.length === 2 ? arr[1] : ''
      }
      this.form = form
    },

    // 关闭地址列表
    handleClose() {
      this.$emit('handleAddressClose')
    },
    // 地址列表确认
    confirm() {
      // 传入默认地址
      this.$emit('AddressConfirm', null)
    },
    // form确认
    async submit() {
      await this.hadleForm() // 创建地址 通过后 触发获取地址列表
      await this.loadData()
      this.modelVisible = false
    },
    // form打开
    handleModelOpen() {
      this.modelTitle = '新增地址'
      this.modelVisible = true
    },
    // form关闭
    handleModelClose() {
      this.modelVisible = false
    },
  },
}
</script>

<style scoped lang="scss">
.address-item {
  padding: 8px;
  border: 1px solid #aaaaaa;
  border-radius: 8px;
  margin: 10px 0;
  position: relative;

  .item-list {
    display: flex;
    justify-content: end;
    margin: 6px;

    div {
      margin-right: 100px;
    }

    .label {
      font-weight: 600;
    }
  }

  .handle-but {
    position: absolute;
    top: 8px;
    right: 32px;
    font-size: 16px;

    i {
      cursor: pointer;
      margin: 0 10px;
    }
  }
}
</style>
