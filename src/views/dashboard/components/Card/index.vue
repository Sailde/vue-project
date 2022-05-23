<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <div class="header">
          <div>{{name}}</div>
          <h2>{{number}}</h2>
          <i class="el-icon-info"></i>
        </div>
        <div class="charts">
          <slot name="content"></slot>
        </div>
      </div>
      <div>
       <slot name="contentTwo"></slot>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Card",
    props: ['name', 'number']
  }
</script>

<style scoped>
  .header {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    position: relative;
  }

  .el-icon-info {
    position: absolute;
    top: 0;
    right: 1%;
    color: rgba(0,0,0,0.4);
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
  }
  .charts{
    height: 50px;
  }
</style>
