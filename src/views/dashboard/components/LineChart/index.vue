<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "LineChart",
    mounted() {
      let lineChart = echarts.init(this.$refs.charts)
      lineChart.setOption({
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            data: [200, 50, 20, 40, 70, 20, 100,90, 80, 55, 130, 155],
            type: 'line',
            smooth: true,
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color: "rgba(143,120,196, 1)"
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(143,120,196, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(143,120,196, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }

        ],
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
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
