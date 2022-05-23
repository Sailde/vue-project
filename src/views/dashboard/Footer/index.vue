<template>
  <div style="height: 400px">
    <el-row :gutter="10">
      <el-col :span="12"><div class="grid-content bg-purple"><LeftChart></LeftChart></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light"><RightChart></RightChart></div></el-col>
    </el-row>
  </div>
</template>

<script>
  import LeftChart from '@/views/dashboard/Footer/components/LeftChart'
  import RightChart from '@/views/dashboard/Footer/components/RightChart'

  export default {
    name: "Footer",
    components: {
      LeftChart,
      RightChart,
    }
  }
</script>

<style scoped>

</style>
