<template>
  <div class="charts" ref="progresschart"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "ProgressChart",
    mounted() {
      let lineChart3 = echarts.init(this.$refs.progresschart)
      lineChart3.setOption({
        xAxis: {
          show: false,
          min: 0,
          max: 100,
        },
        yAxis: {
          show: false,
          type: "category",
        },
        series: [
          {
            data: [78],
            type: 'bar',
            barWidth: 15,
            color: "rgba(151,192,42,1)",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(0,0,0,0.1)",
            },
            label: {
              show: true,
              position: "right",
              formatter: '|'
            }
          }
        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
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
