import _axios from '@/lin/plugin/axios'

class Product {
  // 获取全部产品
  async getAllList() {
    return _axios({
      method: 'get',
      url: 'v1/product/all',
      handleError: true,
    })
  }

  async getDetails(id) {
    return _axios({
      method: 'get',
      url: `v1/product/${id}`,
    })
  }
}

export default new Product()
