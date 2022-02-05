<template>
  <div class="hello">
    <Sidebar />
    <div class="main-content" id="panel">
      <Nav />
      <Header />
      <div class="container-fluid mt--6">
        <router-view />
        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Header from '@/views/layout/header.vue'
import Footer from '@/views/layout/footer.vue'
import Sidebar from '@/views/layout/sidebar.vue'
import Nav from '@/views/layout/nav.vue'

export default {
  name: 'HelloWorld',
  components: {
    Header,
    Footer,
    Sidebar,
    Nav
  },
  props: {
    msg: String
  },
  mounted () {
    $(document).ready(function () {
      $('body').removeClass('bg-default')
    })
  }
}
</script>
