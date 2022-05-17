<template>
  <div>
    <el-form label-position="right" label-width="120px">
      <el-form-item label="Spu名称">{{Spu.spuName}}</el-form-item>
      <el-form-item label="Sku名称">
        <el-input placeholder="Sku名称" style="width: 30%" v-model="Sku.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" style="width: 30%" v-model="Sku.price" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量（千克）">
        <el-input placeholder="重量（千克）" style="width: 30%" v-model="Sku.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" style="width: 30%" v-model="Sku.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item style="margin: 5px 0 5px 5px" :label="item.attrName" v-for="item in SkuAttrInfoList"
                        :key="item.id">
            <el-select placeholder="请选择" v-model="item.attrIdandVal">
              <el-option v-for="item2 in item.attrValueList" :label="item2.valueName" :value="`${item.id}:${item2.id}`"
                         :key="item2.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true">
          <el-form-item :label="item.saleAttrName" v-for="item in SkuSaleAttrList" :key="item.id">
            <el-select placeholder="请选择" v-model="item.SaleAttrVal">
              <el-option v-for="item2 in item.spuSaleAttrValueList" :value="`${item.id}:${item2.id}`" :key="item2.id"
                         :label="item2.saleAttrValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          @selection-change="handleSelectionChange"
          :data="SkuImageList"
          border
          ref="singleTable"
          highlight-current-row
          style="width: 100%">
          <el-table-column
            align="center"
            type="selection"
            width="100px">
          </el-table-column>
          <el-table-column
            align="center"
            label="图片"
            width="">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" :alt="row.imgName" width="100px" height="100px">
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="名称"
            prop="imgName"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="操作">
            <template slot-scope="{row,$index}">
              <el-button type="primary" size="mini" v-show="row.isDefault === 0" @click="handleDefault(row)">设置默认
              </el-button>
              <el-tag type="success" v-show="row.isDefault === 1">默认</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="SaveSkuFormData">保存</el-button>
        <el-button @click="quxiao">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SkuForm",
    data() {
      return {
        Sku: {//Spu数据
          category3Id: '', //三级Id
          spuId: '',       //Spu Id
          tmId: '',        //Spu tmId
          price: '',        //Sku 价格
          skuDefaultImg: '', //默认图片信息
          skuDesc: '',      //Sku 规格描述
          skuName: '',      //Sku 名称
          weight: '',       //Sku 重量
          skuAttrValueList: [], //平台属性数据
          skuImageList: [],     //图片的信息数据
          skuSaleAttrList: [],  //销售属性数据
        },
        Spu: {
          spuName: '',
        },
        imageList: [],//收集图片的信息数据
        SkuImageList: [], //图片数据
        SkuSaleAttrList: [], //销售属性数据
        SkuAttrInfoList: [],  //平台属性信息数据
      }
    },
    methods: {
      //获取Sku数据
      async getSkuList({row, oneid, twoid}) {
        this.Sku.category3Id = row.category3Id
        this.Sku.spuId = row.id
        this.Sku.tmId = row.tmId
        this.Spu.spuName = row.spuName
        //调用图片接口 获取图片数据
        let resultImageList = await this.$API.spu.reqSpuSkuImageList(row.id)
        if (resultImageList.code === 200) {
          let list = resultImageList.data
          list.forEach(item => {
            item.isDefault = 0
          })
          this.SkuImageList = list

        }
        //调用销售信息接口 获取销售属性数据
        let resultSaleAttrList = await this.$API.spu.reqSpuSaleAttrList(row.id)
        if (resultSaleAttrList.code === 200) {
          this.SkuSaleAttrList = resultSaleAttrList.data
        }
        //调用属性信息接口 获取属性信息数据
        let resultAttrInfoList = await this.$API.spu.reqAttrInfoList(oneid, twoid, row.category3Id)
        if (resultAttrInfoList.code === 200) {
          this.SkuAttrInfoList = resultAttrInfoList.data
        }
      },
      //图片选中回调
      handleSelectionChange(selection) {
        this.imageList = selection
      },
      //设置默认按钮回调
      handleDefault(row) {
        this.SkuImageList.forEach(item => {
          item.isDefault = 0
        })
        row.isDefault = 1
        //收集默认图片地址
        this.Sku.skuDefaultImg = row.imgUrl
      },
      //保存按钮回调
      async SaveSkuFormData() {
        const {SkuAttrInfoList, SkuSaleAttrList, imageList, Sku} = this

        Sku.skuAttrValueList = SkuAttrInfoList.reduce((prev, item) => {
          if (item.attrIdandVal) {
            const [attrId, valueId] = item.attrIdandVal.split(":");
            prev.push({attrId, valueId})
          }
          return prev;
        }, [])
        Sku.skuSaleAttrList = SkuSaleAttrList.reduce((prev, item) => {
          if (item.SaleAttrVal) {
            const [saleAttrId, saleAttrValueId] = item.SaleAttrVal.split(":")
            prev.push({saleAttrId, saleAttrValueId})
          }
          return prev
        }, [])

        Sku.skuImageList = imageList.map(item =>{
          return{
            imgName:item.imgName,
            imgUrl:item.imgUrl,
            isDefault:item.isDefault,
            spuImgId:item.id,
          }
        })
        let result = await this.$API.spu.reqAddSaveSkuInfo(Sku)
        if (result.code === 200) {
          this.$message({
            type: "success",
            message: "保存成功"
          })
          this.$emit('UpdeScene', {scene: 0, flag: 0})
        } else {
          this.$message({
            type: "error",
            message: "失败"
          })
        }
      },
      //取消按钮回调
      quxiao() {
        this.$emit('UpdeScene', {scene: 0, flag: 0})
        Object.assign(this._data, this.$options.data())
      }
    }
  }
</script>

<style scoped>
  .pingtaiData {
    display: inline-block;
    margin-left: 10px;
  }

</style>
