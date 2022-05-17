<template>
  <div>
    <CategorySelect @getCategoryid="getCategoryid"></CategorySelect>
    <el-card class="box-card">
      <div v-show="scene === 0">
        <el-button class="addshouxing" type="primary" :disabled="!terid" icon="el-icon-plus" @click="addSpuItem()">
          添加Spu
        </el-button>
        <el-table
          :data="pagination.records"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            width="80px"
            align="center"
            label="序号">
          </el-table-column>
          <el-table-column
            prop="spuName"
            label="Spu名称"
            width="200px"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="description"
            label="Spu描述"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="300px"
          >
            <template slot-scope="{row,$index}">
              <el-button size="mini" type="primary" icon="el-icon-plus" title="添加Sku"
                         @click="addSkuListItem(row,$index)"></el-button>
              <el-button size="mini" type="warning" icon="el-icon-edit" title="修改Spu"
                         @click="UpdateSpuList(row)"></el-button>
              <el-button size="mini" type="info" icon="el-icon-info" title="查看当前Spu全部Sku列表"
                         @click="LockSkuList(row)">

              </el-button>
              <el-popconfirm class="deleteBtton" :title="`你确定删除${row.spuName}`" @onConfirm="deleteSpuItem(row,$index)">
                <el-button slot="reference" size="mini" type="danger" icon="el-icon-delete" title="删除Spu"></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.pagination.page"
          :page-sizes="[3, 6, 9, 11]"
          :page-size="this.pagination.limit"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="this.pagination.total">
        </el-pagination>
        <el-dialog :before-close="close" center :title="spu.spuName" :visible.sync="dialogTableVisible">
          <el-table border :data="SkuList" v-loading="loading">
            <el-table-column prop="skuName" label="名称" align="center"></el-table-column>
            <el-table-column prop="price" label="价格" align="center"></el-table-column>
            <el-table-column prop="weight" label="重量" align="center"></el-table-column>
            <el-table-column label="默认图片" align="center">
              <template slot-scope="{row,$index}">
                <img :src="row.skuDefaultImg" alt="" width="100px" height="100px">
              </template>
            </el-table-column>
          </el-table>
        </el-dialog>
      </div>
      <SpuForm v-show="scene === 1" @UpdeScene="UpdeScene" :UpdateSpuLists="UpdateSpuLists" ref="SpuForm"></SpuForm>
      <SkuForm v-show="scene === 2" @UpdeScene="UpdeScene" ref="SkuForm"></SkuForm>
    </el-card>
  </div>
</template>

<script>
  import SpuForm from './SpuForm'
  import SkuForm from './SkuForm'

  export default {
    name: "Spu",
    components: {
      SpuForm,
      SkuForm
    },
    data() {
      return {
        //一级id
        oneid: '',
        //二级id
        twoid: '',
        //三级id
        terid: '',
        //0 代表展示Spu列表数据 1 添加Spu|修改Spu 2添加Spu
        scene: 0,
        //分页属性
        pagination: {
          //默认第一页
          pages: 1,
          //默认分页 3页
          limit: 3,
          //总条数
          total: 0,
          //平台属性数据
          records: [],
        },
        //修改类数据
        UpdateSpuLists: {},
        dialogTableVisible: false, //默认关闭对话框
        spu: {},
        SkuList: [],//查看Sku数据
        loading: true, //loading效果
      }
    },
    methods: {
      //更具id 发送请求获取数据
      async getAtterList(page = 1) {
        this.pagination.pages = page;
        let {pagination: {pages, limit}, terid} = this
        let result = await this.$API.spu.reqSpuList(pages, limit, terid)
        if (result.code === 200) {
          let {data: {current, size, total, records}} = result
          this.pagination.pages = current
          this.pagination.limit = size
          this.pagination.total = total
          this.pagination.records = records
        }
      },
      //一级 二级 三级 菜单 id获取
      getCategoryid({id, index}) {
        if (index === 1) {
          this.twoid = ''
          this.terid = ''
          this.pagination.records = []
          this.oneid = id
        } else if (index === 2) {
          this.terid = ''
          this.pagination.records = []
          this.twoid = id
        } else {
          this.terid = id
          this.getAtterList()
        }
      },
      //添加Spu按钮回调
      addSpuItem() {
        this.scene = 1
        this.$refs.SpuForm.initSpuFormLists(this.terid);
      },
      //修改Spu列表数据
      UpdateSpuList(row) {
        this.scene = 1;
        this.$refs.SpuForm.initSpuFormList(row);
      },
      //查看Sku列表数据
      async LockSkuList(row) {
        this.SkuList = []
        this.dialogTableVisible = true;
        this.spu = row;
        let result = await this.$API.spu.reqFindBySpuId(row.id)
        if (result.code === 200) {
          //数据返回回来使loading效果关闭
          this.loading = false
          this.SkuList = result.data
        }
      },
      //删除Spu中的一项
      async deleteSpuItem(row, index) {
        let {pagination: {records, pages}} = this
        let result = await this.$API.spu.reqDeleteSpuItem(row.id)
        if (result.code === 200) {
          this.$message({
            type: 'success',
            message: "删除成功！"
          })
          this.getAtterList(records.length > 1 ? pages : pages - 1)
        }

      },
      //分页器每条显示的数据
      handleSizeChange(limit) {
        this.pagination.limit = limit
        this.getAtterList()
      },
      //分页器当前显示的页数
      handleCurrentChange(pages) {
        this.pagination.pages = pages
        this.getAtterList(this.pagination.pages)
      },
      //自定义事件回调 （SpuForm组件）
      UpdeScene({scene, flag}) {
        this.scene = scene;
        if (flag === "修改") {
          this.getAtterList(this.pagination.pages);
        } else if (flag === 0) {
          return
        } else {
          this.getAtterList()
        }
      },

      //item项中添加Sku按钮回调
      addSkuListItem(row, index) {
        const {oneid, twoid} = this;
        this.scene = 2;
        this.$refs.SkuForm.getSkuList({row, oneid, twoid})
      },

      //Dialog关闭窗口的回调
      close(done) {
        //关闭对话框使loading 还原
        this.loading = true;
        done()
      },
    }
  }
</script>

<style scoped>
  .addshouxing {
    margin: 10px 0;
  }

  .deleteBtton {
    margin: 0 0 0 10px;
  }
</style>
