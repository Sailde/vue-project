<template>
  <div ref="viewschart" style="width: 100% ;height: 300px"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: "ViewsChart",
    mounted() {
      this.lineChart4 = echarts.init(this.$refs.viewschart);
      this.lineChart4.setOption({
        title: {
          text: '销售额趋势',
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十一月', '十二月'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: [100, 202, 240, 334, 390, 330, 220, 180, 150, 190, 150]
          }
        ]
      })
    },
    data() {
      return {
        lineChart4: {}
      }
    },
    methods: {
      echarList(title) {
        this.lineChart4.setOption({
          title: {
            text: `${title}趋势`,
          },
        })
      }
    }
  }
</script>

<style scoped>

</style>
