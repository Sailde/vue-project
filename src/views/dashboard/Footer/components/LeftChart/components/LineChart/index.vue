<template>
  <div>
    <span>{{title}}</span> <i style="margin-left: 10px" class="el-icon-info"></i>
    <div>
      <h3 style="display: inline-block;margin-right: 20px">{{num}}</h3><span><i
      class="margin"/>{{content}}</span> <i class="el-icon-caret-top" style="color: red" v-show="title=== '搜索用户数'"></i><i class="el-icon-caret-bottom" style="color: lawngreen" v-show="title=== '人均搜索次数'"></i>
    </div>
    <div ref="linechart" style="width: 100%;height: 40px;"></div>
  </div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "LineChart",
    props:['title','num','content'],
    mounted() {
      let myChart = echarts.init(this.$refs.linechart);
      myChart.setOption({
        xAxis: {
          show: false,
          type: "category",
        },
        yAxis: {
          show: false,
        },
        series: [
          {
            data: [40, 30, 50, 35, 45, 30, 55],
            type: 'line',
            smooth: true,
            itemStyle: {
              opacity: 0,
            },
            lineStyle: {
              color: "rgba(142,173,237, 1)"
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(235,242,252, 1)' // 0% 处的颜色
                }, {
                  offset: 1, color: 'rgba(142,173,237, 0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }

        ],
        grid: {
          top: 0,
          left: -20,
          right: 0,
          bottom: 0
        },
      })
    }
  }
</script>

<style scoped>
</style>
