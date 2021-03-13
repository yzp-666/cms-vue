/* eslint-disable class-methods-use-this */
import _axios, { get, put, _delete } from '@/lin/plugin/axios'

class Client {
  // constructor() {}

  async createClient(data) {
    return _axios({
      method: 'post',
      url: 'v1/client',
      data,
    })
  }

  // 在这里通过 async await 语法糖让代码同步执行
  // 1. await 一定要搭配 async 来使用
  // 2. await 后面跟的是一个 Promise 对象
  async getClient(id) {
    const res = await get(`v1/client/${id}`)
    return res
  }

  // 编辑
  async editClient(id, info) {
    const res = await put(`v1/client/${id}`, info)
    return res
  }

  async deleteClient(id) {
    const res = await _delete(`v1/client/delete/${id}`)
    return res
  }

  async getList() {
    return _axios({
      method: 'get',
      url: 'v1/client',
      handleError: true,
    })
  }

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
