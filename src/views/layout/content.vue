<template>
  <div class="container-fluid mt--6">
    <div class="row">
        <slot name="content"></slot>
    </div>
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
