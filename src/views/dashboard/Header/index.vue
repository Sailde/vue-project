<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6" class="el-col-item">
        <Card name="总销售额" number="￥ 126560">
          <template v-slot:content>
            <span>周同比 <i class="margin"/>56.67%</span> <i class="el-icon-caret-top"></i>
            <span>周同比 <i class="margin"/>56.67%</span> <i class="el-icon-caret-bottom"></i>
          </template>
          <template v-slot:contentTwo>
            日销售额 ￥ 12423
          </template>
        </Card>
      </el-col>
      <el-col :span="6" class="el-col-item">
        <Card name="访问量" number="88460">
          <template v-slot:content>
            <LineChart></LineChart>
          </template>
          <template v-slot:contentTwo>
            日访问量 1234
          </template>
        </Card>
      </el-col>
      <el-col :span="6" class="el-col-item">
        <Card name="支付笔数" number="88460">
          <template v-slot:content>
            <BarChart></BarChart>
          </template>
          <template v-slot:contentTwo>
            转化率 65%
            日访问量 1234
          </template>
        </Card>
      </el-col>
      <el-col :span="6" class="el-col-item">
        <Card name="运营活动效果" number="78%">
          <template v-slot:content>
            <ProgressChart></ProgressChart>
          </template>
          <template v-slot:contentTwo>
            <span>周同比 <i class="margin"/>12%</span> <i class="el-icon-caret-top"></i>
            <span>周同比 <i class="margin"/>11%</span> <i class="el-icon-caret-bottom"></i>
          </template>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Card from "@/views/dashboard/components/Card"
  //条状图
  import LineChart from "@/views/dashboard/components/LineChart"
  //柱状图
  import BarChart from "@/views/dashboard/components/BarChart"
  //横状图
  import ProgressChart from "@/views/dashboard/components/ProgressChart"

  export default {
    name: "Header",
    components: {
      Card,
      LineChart,
      BarChart,
      ProgressChart,
    }
  }
</script>

<style scoped>
  >>> .el-col-item {
    padding: 5px;
  }

  .el-icon-caret-top {
    color: red;
    margin-right: 10px;
  }

  .el-icon-caret-bottom {
    color: lawngreen;
  }

  .margin {
    margin-right: 5px;
  }
</style>
