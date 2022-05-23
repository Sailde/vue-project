<template>
  <div class="charts" ref="barcharts"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "BarChart",
    mounted() {
      let lineChart2 = echarts.init(this.$refs.barcharts)
      lineChart2.setOption({
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            data: [200, 50, 100, 120, 165, 100, 80, 50, 90, 180, 110, 150],
            type: 'bar',
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        },
        tooltip: {
          show: true,
          trigger: "axis"
        },
      })
    }
  }
</script>

<style scoped>
  .charts {
    width: 100%;
    height: 100%;
  }
</style>
