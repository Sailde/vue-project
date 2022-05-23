<template>
  <div>
    <Header></Header>
    <Content></Content>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '@/views/dashboard/Header'
  import Footer from '@/views/dashboard/Footer'
  import Content from '@/views/dashboard/Content'

  export default {
    name: "Dashboard",
    components: {
      Header,
      Footer,
      Content
    }
  };
</script>

<style lang="scss" scoped>

</style>
