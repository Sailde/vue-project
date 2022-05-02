<template>
  <div>
    <CategorySelect @getCategoryid="getCategoryid"></CategorySelect>
    <el-card class="box-card">
      <div v-show="isShowTable">
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
              <el-button size="mini" type="primary" icon="el-icon-plus" title="添加Spu"></el-button>
              <el-button size="mini" type="warning" icon="el-icon-edit" title="修改Spu"></el-button>
              <el-button size="mini" type="info" icon="el-icon-info" title="查看当前Spu全部Sku列表"></el-button>
              <el-button size="mini" type="danger" icon="el-icon-delete" title="删除Spu"></el-button>
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
      </div>

      <div v-show="!isShowTable">
        222
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Spu",
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
        }
      }
    },
    methods: {
      //更具id 发送请求获取数据
      async getAtterList() {
        let {pagination: {pages, limit}, terid} = this
        let result = await this.$API.spu.reqSpuList(pages, limit, terid)
        if (result.code === 200) {
          let {data: {pages, size, total, records}} = result
          this.pagination.pages = pages
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
          this.oneid = id
          this.delepagination()
        } else if (index === 2) {
          this.terid = ''
          this.twoid = id
          this.delepagination()
        } else {
          this.terid = id
          this.getAtterList()
        }
      },
      //添加Spu按钮回调
      addSpuItem() {
        this.isShowTable = false
      },
      //分页器每条显示的数据
      handleSizeChange(limit) {
       this.pagination.limit = limit
        this.getAtterList()
      },
      //分页器当前显示的页数
      handleCurrentChange(pages) {
        this.pagination.pages = pages
        this.getAtterList()
      },
      //导航栏切换清空数据
      delepagination() {
        this.pagination = {
          //默认第一页
          pages: 1,
          //默认分页 3页
          limit: 3,
          //总条数
          total: 0,
          //平台属性数据
          records: [],
        }
      }
    }
  }
</script>

<style scoped>
  .addshouxing {
    margin: 10px 0;
  }
</style>
