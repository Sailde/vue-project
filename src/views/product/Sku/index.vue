<template>
  <div>
    <!--    表格区-->
    <el-table
      v-loading="loading"
      :data="pagination.records"
      ref="singleTable"
      border
      highlight-current-row
      style="width: 100%">
      <el-table-column
        align="center"
        type="index"
        label="序号"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="skuName"
        label="名称">
      </el-table-column>
      <el-table-column
        align="center"
        prop="skuDesc"
        label="描述">
      </el-table-column>
      <el-table-column
        align="center"
        label="默认图片">
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" width="100px" height="100px">
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="weight"
        label="重量">
      </el-table-column>
      <el-table-column
        align="center"
        label="价格"
        prop="price"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="240">
        <template slot-scope="{row,$index}">
          <el-button v-show="row.isSale === 0" type="success" icon="el-icon-bottom" size="mini" title="上架"
                     @click="PutOrDown({isSales:0,row})"></el-button>
          <el-button v-show="row.isSale === 1" type="success" icon=" el-icon-top" size="mini" title="下架"
                     @click="PutOrDown({isSales:1,row})"></el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" title="正在开发中！"
                     @click="$message('正在开发中！')"></el-button>
          <el-button type="info" icon="el-icon-info" size="mini" title="查看Sku信息"
                     @click="SkuById(row,$index)"></el-button>
          <el-popconfirm
            style="margin-left: 10px"
            :title="`你确定要删除：${row.skuName}`"
            @onConfirm="deleteSkuItem(row,$index)"
          >
            <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini"
                       title="删除"></el-button>
          </el-popconfirm>

        </template>
      </el-table-column>
    </el-table>
    <!--    分页区-->
    <el-pagination
      align="center"
      @current-change="CurrentChange"
      @size-change="SizeChange"
      :pager-count="5"
      :page-sizes="[10, 30, 60, 100]"
      :current-page="this.pagination.page"
      :page-size="this.pagination.limit"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="this.pagination.total">
    </el-pagination>
    <!--    抽屉区-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false">
      <el-form ref="form" label-width="100px" class="dinwei">
        <el-form-item label="名称">
          {{skubyId.skuName}}
        </el-form-item>
        <el-form-item label="描述">
          {{skubyId.skuDesc}}
        </el-form-item>
        <el-form-item label="价格">
          {{skubyId.price}}
        </el-form-item>
        <el-form-item label="平台属性">
          <el-tag style="margin-left: 10px" type="success" v-for="(item,index) in skubyId.skuSaleAttrValueList"
                  :key="item.id">{{item.saleAttrValueName}}
          </el-tag>
        </el-form-item>
        <el-form-item label="商品图标">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in skubyId.skuImageList" :key="item.id">
              <img :src="item.imgUrl" alt="" width="100%" height="100%">
            </el-carousel-item>
          </el-carousel>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
  export default {
    name: "Sku",
    data() {
      return {
        loading: true,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          records: []
        },
        skubyId: {},
        drawer: false,
      }
    },
    mounted() {
      this.getSpuList()
    },
    methods: {
      //根据当前默认数据发送请求
      async getSpuList(pages = 1) {
        this.pagination.page = pages
        let {pagination: {page, limit}} = this
        let result = await this.$API.sku.reqSkuList(page, limit)
        if (result.code === 200) {
          this.loading = false
          this.pagination.records = result.data.records
          this.pagination.total = result.data.total
          this.pagination.page = result.data.current
        }
      },
      //当前页发生变化回调
      CurrentChange(pages) {
        this.pagination.page = pages;
        this.loading = true
        this.getSpuList(pages)
      },
      //当前显示多少内容回调
      SizeChange(limits) {
        this.loading = true
        this.pagination.limit = limits
        this.getSpuList()
      },
      //删除按钮确定回调
      deleteSkuItem(row) {
        console.log(row)
      },
      //上架 OR 下架 回调
      async PutOrDown({isSales, row}) {
        if (isSales === 0) {
          this.loading = true
          row.isSale = 0
          let result = await this.$API.sku.reqPutOrDown({isSale: 0, skuId: row.id})
          if (result.code === 200) {
            this.getSpuList(this.pagination.page)
            this.loading = false
            this.$message({
              type: "success",
              message: "上架成功"
            })
          }
        } else {
          this.loading = true
          row.isSale = 1
          let result = await this.$API.sku.reqPutOrDown({isSale: 1, skuId: row.id})
          if (result.code === 200) {
            this.getSpuList(this.pagination.page)
            this.loading = false
            this.$message({
              type: "success",
              message: "下架成功"
            })
          }
          row.isSale = 1
        }
      },

      //查看Sku信息回调
      async SkuById(row, index) {
        let result = await this.$API.sku.reqSkuById(row.id)
        if (result.code === 200) {
          this.skubyId = result.data
          this.drawer = true
        }
      },
    }
  }
</script>

<style scoped>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  .dinwei {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-54%, -50%);
  }
</style>
