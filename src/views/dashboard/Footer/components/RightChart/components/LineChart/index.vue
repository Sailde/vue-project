<template>
  <div ref="linechart" style="width: 100%;height: 250px;"></div>
</template>

<script>
  import * as echarts from 'echarts';

  export default {
    name: "LineChart",
    mounted() {
      let myChart = echarts.init(this.$refs.linechart);
      myChart.setOption({
        title: {
          text: '视频广告',
          subtext: '1048',
          left: "center",
          top: "center",
          textStyle: {
            fontSize: 24
          },
          subtextStyle: {
            fontSize: 18
          }
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            type: 'pie',
            radius: ['60%', '100%'],
            data: [
              {value: 1048, name: '视频广告'},
              {value: 735, name: '联盟广告'},
              {value: 580, name: '邮件营销'},
              {value: 484, name: '直接访问'},
              {value: 300, name: '搜索引擎'}
            ],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
          }
        ]
      })
      myChart.on('mouseover', (params) => {
        const {name, value} = params
        myChart.setOption({
          title: {
            text: name,
            subtext: value,
          },
        })
      });
    }
  }
</script>

<style scoped>
</style>
