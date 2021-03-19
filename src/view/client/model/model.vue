<template>
  <div>
    <!--    表单-->
    <el-dialog
      :title="status === 'create' ? '创建客户' : '编辑客户'"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="55%"
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
          <el-input v-model="form.byPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
          <div v-if="status === 'create'">
            <!--            <el-col :span="3" >-->
            <!--              <div style="text-align: right">省/市/区</div>-->
            <!--            </el-col>-->
            <!--            <el-col :span="9">-->
            <!--              <el-cascader-->
            <!--                v-model="form.city"-->
            <!--                :options="cityOption"-->
            <!--                :props="props"-->
            <!--                style="width: 100%"-->
            <!--              ></el-cascader>-->
            <!--            </el-col>-->
            <!--            <el-col :span="3">-->
            <!--              <div style="text-align: right">详细地址</div>-->
            <!--            </el-col>-->
            <!--            <el-col :span="9">-->
            <!--              <el-input v-model="form.addressDetail"></el-input>-->
            <!--            </el-col>-->
          </div>
          <div v-else>
            <el-input v-if="form.address" v-model="form.address" disabled></el-input>
            <el-button type="primary" @click="addressVisible = true">选择地址</el-button>
          </div>
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

      <client-add-type-model
        :options="options"
        :clientTypeVisible="clientTypeVisible"
        @handleClose="handleTypeModelClose"
        @changeType="changeType"
      ></client-add-type-model>

      <address-model
        :id="id"
        :addressVisible="addressVisible"
        @handleAddressClose="handleAddressClose"
        @AddressConfirm="AddressConfirm"
      ></address-model>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import client from '@/model/client' // api
import ClientAddTypeModel from './clientAddTypeModel'
import AddressModel from './addressModel'
import pca from './pca-code.json'

export default {
  components: {
    ClientAddTypeModel,
    AddressModel,
  },
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
      props: { label: 'name', value: 'name', expandTrigger: 'hover' },
      clientTypeVisible: false,
      formLabelWidth: '80px',
      addressVisible: false,
    }
  },
  computed: {
    cityOption() {
      return pca
    },
  },
  async created() {
    await this.getClientTypeList()
    await this.getDetails()
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
      const data = JSON.parse(JSON.stringify(this.form))
      data.htje = data.htje ? this.form.htje : '0.00'
      console.log(data)
      try {
        if (this.status === 'create') {
          data.address = `${data.city.join(',')} ${data.addressDetail}` // 创建时合并地址发送 后端保存并添加地址列表
          const create = await client.createClient(data)
          this.$message.success(create.message)
          this.handleClose()
        } else if (this.status === 'edit') {
          const edit = await client.editClient(this.id, data)
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
    handleTypeModelClose() {
      this.getClientTypeList()
      this.clientTypeVisible = false
    },
    changeType(val) {
      this.options = JSON.parse(JSON.stringify(val))
    },

    // 关闭地址选择
    handleAddressClose() {
      this.addressVisible = false
    },
    // 确认地址
    AddressConfirm(val) {
      if (val) {
        this.form.address = val
      }
      this.addressVisible = false
    },
  },
}
</script>

<style scoped>
.client_type {
  display: flex;
  align-items: center;
}
</style>
