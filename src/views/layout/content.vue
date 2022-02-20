<template>
  <div class="container-fluid mt--6">
    <slot name="content"></slot>
    <Footer />
  </div>
</template>

<script>
import Footer from '@/views/layout/footer.vue'

export default {
  name: 'Content',
  props: {
    msg: String
  },
  components: {
    Footer
  }
}
</script>
