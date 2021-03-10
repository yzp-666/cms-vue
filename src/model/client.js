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
  async getBook(id) {
    const res = await get(`v1/book/${id}`)
    return res
  }

  async editBook(id, info) {
    const res = await put(`v1/book/${id}`, info)
    return res
  }

  async deleteBook(id) {
    const res = await _delete(`v1/book/${id}`)
    return res
  }

  async getBooks() {
    return _axios({
      method: 'get',
      url: 'v1/book',
      handleError: true,
    })
  }
}

export default new Client()
