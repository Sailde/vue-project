<template>

  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-tabs v-model="activeName" class="tab" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first"></el-tab-pane>
        <el-tab-pane label="访问量" name="second"></el-tab-pane>
        <el-row :gutter="10">
          <el-col :span="18">
            <ViewsChart ref="viewschart"></ViewsChart>
          </el-col>
          <el-col :span="6">
            <h3>门店{{title}}排名</h3>
            <ul>
              <li>
                <div>
                  <span class="rindex">1</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span class="rindex">2</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span class="rindex">3</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span>4</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span>5</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span>6</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
              <li>
                <div>
                  <span>7</span>
                  <span class="content">肯德基</span>
                </div>
                <span class="rvalue">123456</span>
              </li>
            </ul>
          </el-col>
        </el-row>
      </el-tabs>
      <!--          v-model="activeName" @tab-click="handleClick"-->
      <div class="block">
        <span @click="setDay(1)" title="查看当前趋势">今日</span><span @click="setDay(2)" title="查看本周趋势">本周</span><span @click="setDay(3)" title="查看本月趋势">本月</span><span
        @click="setDay(4)" title="查看本年趋势">本年</span>
        <el-date-picker
          v-model="data"
          value-format="yyyy-MM-dd"
          size="mini"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
    </div>
  </el-card>
</template>

<script>
  import ViewsChart from '@/views/dashboard/components/ViewsChart'
  import dayjs from 'dayjs'

  export default {
    name: "Content",
    data() {
      return {
        activeName: 'first',
        data: [], //收集日历的数据
      }
    },
    components: {
      ViewsChart
    },
    computed: {
      title() {
        return this.activeName === 'first' ? "销售额" : "访问量"
      }
    },
    methods: {
      handleClick(tab, event) {
        this.$refs.viewschart.echarList(this.title)
      },
      setDay(index) {
        if (index === 1) {
          //今日
          let now = dayjs().format("YYYY-MM-DD")
          this.data = [now, now]
        } else if (index === 2) {
          //本周
          let now = dayjs().day(1).format("YYYY-MM-DD")
          let now2 = dayjs().day(7).format("YYYY-MM-DD")
          this.data = [now, now2]
        } else if (index === 3) {
          //本月
          let now = dayjs().startOf('month').format("YYYY-MM-DD")
          let now2 = dayjs().endOf('month').format("YYYY-MM-DD")
          this.data = [now, now2]
        } else {
          //本年
          let now = dayjs().startOf('year').format("YYYY-MM-DD")
          let now2 = dayjs().endOf('year').format("YYYY-MM-DD")
          this.data = [now, now2]
        }
      }
    }
  }
</script>

<style scoped>
  .box-card {
    position: relative;
    margin: 10px 0;
  }

  .clearfix {
    display: flex;
    flex-flow: row nowrap;
    height: 370px;
  }

  .tab {
    width: 100%;
  }

  >>> .el-card__header {
    border: none;
  }

  .block {
    position: absolute;
    top: 17px;
    right: 20px;
    opacity: 1;
  }

  .block span {
    margin: 0 10px;
  }

  ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0;
  }

  ul li {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .rindex {
    float: left;
    width: 20px;
    height: 20px;
    color: white;
    border-radius: 50%;
    background-color: black;
  }

  .content {
    margin-left: 10px;
  }
</style>
