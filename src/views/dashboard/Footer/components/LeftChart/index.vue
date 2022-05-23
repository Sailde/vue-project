<template>
  <el-card class="box-card">
    <!--    卡片头部-->
    <div slot="header" class="clearfix">
      <div class="search-header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!--    echart视图-->
    <el-row :gutter="10">
      <el-col :span="12">
        <LineChart title="搜索用户数" num="12321" content="17.1"></LineChart>
      </el-col>
      <el-col :span="12">
        <LineChart title="人均搜索次数" num="2.7" content="26.2"></LineChart>
      </el-col>
    </el-row>
    <!--    //表格-->
    <el-table
      ref="singleTable"
      border
      highlight-current-row
      style="width: 100%;margin: 5px 0">
      <el-table-column
        align="center"
        type="index"
        label="排名"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        label="搜索关键字"
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        label="用户数"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        align="center"
        sortable
        label="周涨幅">
      </el-table-column>
    </el-table>
    <!--    分页-->
    <el-pagination
      align="center"
      layout="prev, pager, next"
      :pager-count="5"
      :total="1000">
    </el-pagination>
  </el-card>
</template>

<script>
  import LineChart from '@/views/dashboard/Footer/components/LeftChart/components/LineChart'

  export default {
    name: "LeftChart",
    components: {
      LineChart
    }
  }
</script>

<style scoped>
  .search-header {
    display: flex;
    justify-content: space-between;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;

  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 100%;
    height: 100%;
  }
</style>
