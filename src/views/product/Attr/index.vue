<template>
  <div>
    <CategorySelect @getCategoryid="getCategoryid"></CategorySelect>
    <el-card class="box-card">
      <div v-show="isShowTable">
        <el-button class="addshouxing" type="primary" :disabled="!terid" @click="addAtter"
                   icon="el-icon-plus">添加属性
        </el-button>
        <el-table
          :data="AtterList"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="80px"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="attrName"
            label="属性名称"
            width="200px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            label="属性值列表"
            align="center">
            <template slot-scope="{row,$index}">
              <el-tag type="success" class="el-tag-Atter" v-for="item in row.attrValueList" :key="item.id">
                {{item.valueName}}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="200px"
          >
            <template slot-scope="{row,$index}">
              <el-button type="warning" icon="el-icon-edit" size="mini" @click="shoudialogTable(row)">修改</el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleAtterList(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTable">
        <el-form :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" style="width: 27%"></el-input>
            <el-button icon="el-icon-plus" type="primary" style="margin-left: 20px" :disabled="!attrInfo.attrName"
                       @click="addAttrValue()">添加属性值
            </el-button>
            <el-button style="margin-left: 20px" type="primary" :disabled="this.attrInfo.attrValueList.length<1" @click="AddOrUpdateAttr">保存</el-button>
            <el-button style="margin-left: 20px" @click="isShowTable = true">取消</el-button>
          </el-form-item>
          <el-form-item>
            <el-table border :data="attrInfo.attrValueList">
              <el-table-column label="序号" width="80px" type="index" align="center">
              </el-table-column>
              <el-table-column label="属性值名称" align="center">
                <template slot-scope="{row,$index}">
                  <el-input :ref="$index" placeholder="请输入属性值名称" size="mini" v-model="row.valueName" v-if="row.flag"
                            @blur="toLook(row)" @keyup.native.enter="toLook(row)"></el-input>
                  <span v-else @click="toEdit(row,$index)" style="display:block">{{row.valueName}}</span>
                </template>
              </el-table-column>
              <el-table-column width="100px" label="操作" align="center">
                <template slot-scope="{row,$index}">
                  <el-popconfirm :title="`你确定删除：${row.valueName}?`" @onConfirm="deleattrValueList(row,$index)">
                    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"></el-button>
                  </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Atter",
    data() {
      return {
        //一级id
        oneid: '',
        //二级id
        twoid: '',
        //三级id
        terid: '',
        //控制平台属性卡片的显示与隐藏
        isShowTable: true,
        //平台属性展示
        AtterList: [],
        //收集新增属性 | 修改属性使用
        attrInfo: {
          attrName: "",
          attrValueList: [],
          categoryId: '',
          categoryLevel: ''
        }
      }
    },
    methods: {
      getCategoryid({id, index}) {
        if (index === 1) {
          this.twoid = ''
          this.terid = ''
          this.oneid = id
          this.AtterList = []
          this.delattrInfo()
        } else if (index === 2) {
          this.terid = ''
          this.twoid = id
          this.AtterList = []
          this.delattrInfo()
        } else {
          this.terid = id
          this.getAtterList()
          this.delattrInfo()
        }
      },
      //获取平台属性
      async getAtterList() {
        let {oneid, twoid, terid} = this
        let result = await this.$API.attrs.reqgetAtterList(oneid, twoid, terid)
        if (result.code === 200) {
          this.AtterList = result.data
        }
      },
      //内页-添加属性值按钮
      addAttrValue() {
        let {attrInfo: {attrValueList}} = this
        attrValueList.unshift({
          attrId: this.attrInfo.id,
          valueName: '',
          //控制元素之间的切换
          flag: true
        })
        this.$nextTick(() => {
          this.$refs[attrValueList.length - attrValueList.length].focus()
        })
      },
      //内页-input 和 span 元素切换函数
      toLook(row) {
        if (row.valueName.trim() === '') {
          this.$message({
            message: '内容不能为空!',
            type: 'warning'
          });
          return
        }
        let result = this.attrInfo.attrValueList.some((item) => {
          if (row !== item) {
            return row.valueName == item.valueName
          }
        })
        if (result) {
          this.$message({
            message: '内容不能重复！',
            type: 'warning'
          });
          return
        } else {
          row.flag = false;
        }


      },
      //内页-span 切换到input 获取节点
      toEdit(row, index) {
        row.flag = true
        this.$nextTick(() => {
          this.$refs[index].focus()
        })
      },
      //内页-气泡确认框回调
      deleattrValueList(row, index) {
        this.attrInfo.attrValueList.splice(index, 1)
      },
      //内页-保存按钮
      async AddOrUpdateAttr() {
        let {attrInfo: {attrValueList}} = this
        attrValueList = attrValueList.filter((item) => {
          if (item.valueName != '') {
            delete item.flag
            return true
          }
        })
        try {
          await this.$API.attrs.reqAddOrUpdateAttr(this.attrInfo)
          this.$message({
            type: "success",
            message: "保存成功！"
          })
          this.getAtterList()
          this.isShowTable = true
        } catch (e) {
          this.$message({
            type: "error",
            message: "保存失败！"
          })
        }
      },
      //主页添加属性按钮
      addAtter() {
        this.isShowTable = false
        this.attrInfo = {
          attrName: "",
          attrValueList: [],
          categoryId: this.terid,
          categoryLevel: this.terid
        }
      },
      //主页修改属性按钮
      shoudialogTable(row) {
        this.isShowTable = false
        this.attrInfo = JSON.parse(JSON.stringify(row))
        this.attrInfo.attrValueList.forEach((item) => {
          this.$set(item, "flag", false)
        })
      },
      //主页删除属性按钮
      deleAtterList(row) {
      },
      //当一级 二级 三级 菜单 发生变化 || 还原默认状态 返回主页
      delattrInfo() {
        this.attrInfo = {
          attrName: "",
          attrValueList: [],
          categoryId: '',
          categoryLevel: ''
        }
        this.isShowTable = true
      }
    }
  }
</script>

<style scoped>
  .el-tag-Atter {
    margin: 0 5px;
  }

  .addshouxing {
    margin: 10px 0;
  }
</style>
