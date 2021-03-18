/* eslint-disable class-methods-use-this */
// _axios
import { get, put, _delete } from '@/lin/plugin/axios'

class Address {
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
