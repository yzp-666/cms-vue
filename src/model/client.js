import _axios, { _delete } from '@/lin/plugin/axios'

class Client {
  // 获取客户属性列表
  async getClientTypeList() {
    return _axios({
      method: 'get',
      url: 'v1/client_type',
      handleError: true,
    })
  }

  // 创建客户属性
  async createClientType(data) {
    return _axios({
      method: 'post',
      url: 'v1/client_type',
      data,
    })
  }

  // 删除客户属性
  async deleteClientType(id) {
    const res = await _delete(`v1/client_type/delete/${id}`)
    return res
  }
}

export default new Client()
