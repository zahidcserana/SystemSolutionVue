export default {
  data: () => {
    return {
      loaderActive: false
    }
  },
  methods: {
    showLoader () {
      this.loaderActive = true
    },
    hideLoader () {
      this.loaderActive = false
    }
  }
}
