<template>
  <div>
    <el-card class="box-card">
      <el-form :model="trform" :inline="true" class="demo-form-inline">
        <el-form-item label="一级分类">
          <el-select placeholder="请选择" v-model="trform.oneda" @change="handou1">
            <el-option v-for="(item1) in oneList" :label="item1.name" :value="item1.id" :key="item1.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select placeholder="请选择" v-model="trform.twoda" @change="handou2">
            <el-option v-for="(item2) in twoList" :label="item2.name" :value="item2.id" :key="item2.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select placeholder="请选择" v-model="trform.terda" @change="handou3">
            <el-option v-for="(item3) in terList" :label="item3.name" :value="item3.id" :key="item3.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</template>

<script>
  export default {
    name: "categorySelect",
    data() {
      return {
        trform: {
          oneda: '',
          twoda: '',
          terda: '',
        },
        oneList: [],
        twoList: [],
        terList: []
      }
    },
    mounted() {
      this.getCategoryOneList();
      console.log(this.$parent.gutter);
      console.log(this.$attrs.gutter)
    },
    methods: {
      async getCategoryOneList() {
        let result = await this.$API.attrs.reqAtterOne();
        if (result.code === 200) {
          this.oneList = result.data
        }
      },
      async handou1() {
        let {oneda} = this.trform
        //当一级分类改变 删除后面分类数据
        this.twoList = []
        this.terList = []
        this.trform.twoda = ''
        this.trform.terda = ''
        this.$emit("getCategoryid", {id: oneda, index: 1})


        //当一级分类发生改变 携带一级分类id发送请求获取二级分类
        let result = await this.$API.attrs.reqAtterTwo(oneda)
        if (result.code === 200) {
          this.twoList = result.data
        }
      },
      async handou2() {
        //当二级分类改变 删除后面分类数据
        let {twoda} = this.trform
        this.terList = []
        this.trform.terda = ''
        this.$emit("getCategoryid", {id: twoda, index: 2})

        let result = await this.$API.attrs.reqAtterTwo(twoda)
        if (result.code === 200) {
          this.terList = result.data
        }
      },
      handou3() {
        //获取列表数据
        let {terda} = this.trform
        this.$emit("getCategoryid", {id: terda, index: 3})
      }
    }
  }
</script>

<style scoped>
  .box-card {
    margin: 20px 0;
  }
</style>
