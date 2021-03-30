<template>
  <div class="container">
    <div class="header"><div class="title">颜色设置</div></div>
    <div class="handle">
      <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="产品名称" prop="name">
          <el-autocomplete
            class="inline-input"
            v-model="ruleForm.name"
            :fetch-suggestions="querySearch"
            placeholder="请输入产品名称或编号"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div>
                <span class="name">{{ item.code }}</span>
                <span class="addr">{{ item.name }}</span>
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="产品编号" prop="code">
          <el-input v-model="ruleForm.code" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="handle">
      <el-button @click="addColor" type="primary">添加色号</el-button>
    </div>
    <div class="image-lise">
      <div v-for="item in images" :key="item.sort" class="color-item">
        <i class="el-icon-error close"></i>
        <upload-imgs ref="uploadEle" :value="item.fileImage" :max-num="1" />
        <div class="image-color-li">
          <span>排序</span>
          <el-input v-model="item.sort" placeholder="请输入色号" class="el_input_set"></el-input>
        </div>
        <div class="image-color-li">
          <span>名称</span>
          <el-input v-model="item.name" placeholder="请输入颜色名称" class="el_input_set"></el-input>
        </div>
        <div class="image-color-li">
          <span>价格调整</span>
          <el-input v-model="item.price" class="el_input_set" type="number"></el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import product from '@/model/product'
import UploadImgs from '@/component/base/upload-image/index'

export default {
  components: {
    UploadImgs,
  },
  data() {
    return {
      ruleForm: {
        name: '',
      },
      form: {},
      restaurants: [],
      images: [
        {
          sort: 1,
          name: '',
          price: 0,
          fileImage: [],
        },
      ],
    }
  },
  async created() {
    await this.loadAll()
  },
  methods: {
    async loadAll() {
      // 获取产品列表
      this.restaurants = await product.getAllList()
    },
    querySearch(queryString, cb) {
      const { restaurants } = this
      // 亲求数据
      const results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      cb(results)
    },
    createFilter(queryString) {
      return restaurant => restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
        || restaurant.code.toLowerCase().indexOf(queryString.toLowerCase()) !== -1
    },
    handleSelect(item) {
      this.ruleForm = Object.assign({}, item)
    },
    // 添加色号
    addColor() {
      this.images.push({
        sort: this.images[this.images.length - 1].sort + 1,
        name: '',
        price: 0,
        fileImage: [],
      })
    },
    // 判断排序是否重复
    // 删除颜色
  },
}
</script>

<style lang="scss" scoped>
.demo-ruleForm {
  max-width: 450px;
}
.image-lise {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  padding: 15px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;

  .color-item {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 30px 15px;
    box-sizing: border-box;
    border: 1px solid #dddddd;
    border-radius: 16px;
    margin: 10px;

    .close {
      position: absolute;
      top: 0;
      right: 0;
      color: #dddddd;
      cursor: pointer;
      font-size: 32px;

      &:hover {
        color: #3963bc;
      }
    }

    .image-color-li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      width: 100%;

      .el_input_set {
        width: 70%;
        box-sizing: border-box;
      }
    }
  }
}
.name {
  text-overflow: ellipsis;
  overflow: hidden;
  margin-right: 5px;
}
.addr {
  font-size: 12px;
  color: #b4b4b4;
}

.highlighted .addr {
  color: #ddd;
}
</style>
