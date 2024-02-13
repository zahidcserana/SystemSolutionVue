<template>
  <div class="container-fluid mt--6">
    <loader :active="loaderActive" message="Loading..." />

    <slot v-if="!loaderActive" name="content"></slot>
    <Footer class="page-footer" />
  </div>
</template>

<script>
import Footer from '@/views/layout/footer.vue'
import Loader from '../../components/Loader.vue'
import loaderMixin from '../../../src/mixins/loader'

export default {
  name: 'Content',
  props: {
    msg: String
  },
  components: {
    Footer,
    Loader
  },
  mixins: [loaderMixin],
  mounted () {
    this.showLoader()
    setTimeout(() => {
      this.hideLoader()
    }, 500)
  }
}
</script>
