<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="button">
        <span>销售额类别占比</span>
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <LineChart></LineChart>
  </el-card>
</template>

<script>
  import LineChart from '@/views/dashboard/Footer/components/RightChart/components/LineChart'

  export default {
    name: "RightChart",
    components: {
      LineChart
    },
    data() {
      return {
        radio1: '全部渠道',
        radio2: '线上',
        radio3: '门店',
      }
    }
  }
</script>

<style scoped>

  .text {
    font-size: 14px;
  }

  .button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  >>> .el-card__header {
    padding: 14px 20px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 100%;
    height: 378px;
  }
</style>
