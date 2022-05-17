<template>
  <div>
    <el-form ref="form" label-width="80px" :model="Spu">
      <el-form-item label="Spu名称" class="demo-inline">
        <el-input placeholder="Spu名称" v-model="Spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="品牌" class="demo-inline">
        <el-select placeholder="请选择品牌" v-model="Spu.tmId">
          <el-option v-for="(item,index) in TradeList" :label="item.tmName" :value="item.id" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Spu描述">
        <el-input type="textarea" placeholder="Spu描述" style="width: 30.5%" v-model="Spu.description"></el-input>
      </el-form-item>
      <el-form-item label="Spu图片">
        <el-upload
          action="dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="ImagesList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handlesuccess">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" class="demo-inline">
        <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
          <el-option v-for="(item,index) in unSelectSaleAttr" :label="item.name" :value="`${item.id}:${item.name}`"
                     :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="demo-inline">
        <el-button type="primary" icon="el-icon-plus" :disabled="!attrId" @click="addSaleAttr">添加销售属性</el-button>
      </el-form-item>
      <el-form-item class="demo-inline">
        <el-button class="weizi" type="primary" @click="onSubmit">保存</el-button>
        <el-button class="weizi" @click="$emit('UpdeScene',{scene: 0, flag: Spu.id ? '修改' : '添加'})">取消</el-button>
      </el-form-item>
      <el-form-item style="margin-left: -80px">
        <el-table
          :data="Spu.spuSaleAttrList"
          border
          style="width: 100%">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80">
          </el-table-column>
          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="180"
            align="center">
          </el-table-column>
          <el-table-column label="属性值名称列表" align="center">
            <template slot-scope="{row,$index}">
              <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable
                      :disable-transitions="false"
                      @close="handleClose(row,index)">{{tag.saleAttrValueName}}
              </el-tag>
              <el-input class="input-new-tag" v-if="row.inputVisible" ref="saveTagInput" size="small"
                        v-model="row.inputValue"
                        @keyup.enter.native="handleInputConfirm(row)" @blur="handleInputConfirm(row)"></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="danger" icon="el-icon-delete" title="删除"
                         @click="deletSaleAttrList(row,$index)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "SpuForm",
    data() {
      return {
        dialogImageUrl: '',   //照片墙图片地址
        dialogVisible: false, //照片墙预览对话框
        attrId: '',           //收集未选择的销售属性Id
        Spu: {
          category3Id: '',          //三级id
          description: "",    //描述
          spuName: '',        //spu名称
          tmId: "",            //品牌Id
          spuImageList: [
            // {
            //   id: 0,
            //   imgName: 'string',
            //   imgUrl: 'string',
            //   spuId: 0,
            // }
          ],
          spuSaleAttrList: [
            // {
            //   baseSaleAttrId: 0,
            //   id: 0,
            //   saleAttrName: 'string',
            //   spuId: 0,
            //   spuSaleAttrValueList: [
            //     {
            //       baseSaleAttrId: 0,
            //       id: 0,
            //       isChecked: 'string',
            //       saleAttrName: 'string',
            //       saleAttrValueName: 'string',
            //       spuId: 0,
            //     }
            //   ]
            // }
          ]
        },  //存储Spu信息属性
        TradeList: [],        //储存品牌信息属性
        ImagesList: [],       //储存图片信息属性
        BaseSaleList: [],     //平台全部销售的信息属性
      }
    },
    computed: {
      //计算未选中的销售属性回调
      unSelectSaleAttr() {
        return this.BaseSaleList.filter(item => {
          return this.Spu.spuSaleAttrList.every(item1 => {
            return item.name !== item1.saleAttrName
          })
        })
      }
    },
    methods: {
      //获取品牌数据信息 和 获取平台全部销售的信息 回调
      async initSpuFormLists(id) {
        if (id) {
          Object.assign(this._data, this.$options.data())
          this.Spu.category3Id = id;
        }
        //获取品牌数据信息
        let resultTradeList = await this.$API.spu.reqTradeMarkList()
        if (resultTradeList.code === 200) {
          this.TradeList = resultTradeList.data
        }
        //获取平台全部销售的信息
        let resultBaseSaleList = await this.$API.spu.reqBaseSaleAttrList();
        if (resultBaseSaleList.code === 200) {
          this.BaseSaleList = resultBaseSaleList.data
        }
      },

      //SpuForm组件修改按钮回调
      async initSpuFormList(row) {
        //修改前默认清空一次
        Object.assign(this._data, this.$options.data())
        //获取Spu信息的数据
        let resultSpuList = await this.$API.spu.reqSpuLists(row.id)
        if (resultSpuList.code === 200) {
          this.Spu = resultSpuList.data
        }
        //获取品牌图片的信息
        let resultImagesList = await this.$API.spu.reqSpuImageList(row.id)
        if (resultImagesList.code === 200) {
          //由于照片墙组件 需要把服务器返回的数据整理一下
          let listtArr = resultImagesList.data
          listtArr.forEach((item) => {
            item.name = item.imgName
            item.url = item.imgUrl
          })
          //把整理好的数据赋值给
          this.ImagesList = listtArr
        }

        //获取品牌数据信息 和 获取平台全部销售的信息 回调
        this.initSpuFormLists()
      },

      //关闭 Tag 时触发的事件
      handleClose(row, index) {
        row.spuSaleAttrValueList.splice(index, 1)
      },

      //添加属性名称 和 切换失焦回调
      showInput(row) {
        this.$set(row, "inputVisible", true)
        this.$set(row, "inputValue", '')
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      //删除SaleAttrLists回调
      deletSaleAttrList(row, index) {
        this.Spu.spuSaleAttrList.splice(index, 1)
      },

      //input value 收集回调
      handleInputConfirm(row) {
        const {baseSaleAttrId, inputValue} = row
        if (inputValue.trim() === '') {
          this.$message({
            message: '属性值不能为空!',
            type: 'warning'
          });
          return
        }

        let result = row.spuSaleAttrValueList.every(item => inputValue != item.saleAttrValueName)
        if (result) {
          let NewAttr = {baseSaleAttrId, saleAttrValueName: inputValue,}
          row.spuSaleAttrValueList.push(NewAttr)
        } else {
          this.$message({
            message: '内容不能重复！',
            type: 'warning'
          });
          return
        }
        row.inputVisible = false;
        row.inputValue = '';
      },

      //添加销售属性回调
      addSaleAttr() {
        const [baseSaleAttrId, saleAttrName] = this.attrId.split(":");
        const NewAttr = {baseSaleAttrId, saleAttrName, spuSaleAttrValueList: []}
        this.Spu.spuSaleAttrList.unshift(NewAttr)
        this.attrId = ''
      },

      //照片墙上传回调
      handlesuccess(response, file, fileList) {
        this.ImagesList = fileList
      },

      //照片墙图片删除回调
      handleRemove(file, fileList) {
        this.ImagesList = fileList
      },

      //照片墙图片预览回调
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      //表单保存回调按钮  添加 or 修改
      async onSubmit() {
        this.Spu.spuImageList = this.ImagesList.map(item => {
          return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
          }
        })
        try {
          await this.$API.spu.reqAddSpuOrUpdeteSpu(this.Spu)
          this.$message({
            type: "success",
            message: "保存成功！"
          })
          this.$emit("UpdeScene", {scene: 0, flag: this.Spu.id ? "修改" : "添加"})
          Object.assign(this._data, this.$options.data())
        } catch (e) {
          this.$message({
            type: "error",
            message: "修改失败！"
          })

        }
      },
    }
  }
</script>

<style scoped>
  .demo-inline {
    display: inline-block;
  }

  .weizi {
    margin: 0 10px;
  }

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
