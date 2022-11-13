<template>
  <div class="hello">
    <Sidebar />
    <div class="main-content" id="panel">
      <Nav />
      <router-view />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import Sidebar from '@/views/layout/sidebar.vue'
import Nav from '@/views/layout/nav.vue'

export default {
  name: 'HelloWorld',
  components: {
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
