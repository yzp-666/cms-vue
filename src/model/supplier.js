import _axios, { _delete } from '@/lin/plugin/axios'

class Supplier {
  // 获取客户属性列表
  async getSupplierTypeList() {
    return _axios({
      method: 'get',
      url: 'v1/supplier_type',
      handleError: true,
    })
  }

  // 创建客户属性
  async createSupplierType(data) {
    return _axios({
      method: 'post',
      url: 'v1/supplier_type',
      data,
    })
  }

  // 删除客户属性
  async deleteSupplierType(id) {
    const res = await _delete(`v1/supplier_type/delete/${id}`)
    return res
  }
}

export default new Supplier()
