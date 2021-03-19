/* eslint-disable class-methods-use-this */
// _axios
import { get, post, put, _delete } from '@/lin/plugin/axios'

class Address {
  // 创建客户地址
  async createAddress(data) {
    const res = await post('v1/address', data)
    return res
  }

  // 根据客户ID获取客户地址
  async getAddressListk(id) {
    const res = await get(`v1/address/${id}`)
    return res
  }

  async editAddress(id, info) {
    const res = await put(`v1/address/${id}`, info)
    return res
  }

  async deleteAddress(id) {
    const res = await _delete(`v1/address/${id}`)
    return res
  }
}

export default new Address()
