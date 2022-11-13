<template>
  <div class="alert-msg">
    <div v-if="errorMsg" class="alert alert-danger">
      <button
        type="button"
        aria-hidden="true"
        data-dismiss="alert"
        class="close"
      >
        <i class="nc-icon nc-simple-remove"></i>
      </button>
      <span><b> Error: </b> {{ errorMsg }}</span>
    </div>
    <div v-if="successMsg" class="alert alert-info">
      <button
        type="button"
        aria-hidden="true"
        data-dismiss="alert"
        class="close"
      >
        <i class="nc-icon nc-simple-remove"></i>
      </button>
      <span><b> Success: </b> {{ successMsg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Alert',
  props: {
    errorMsg: String,
    successMsg: String
  }
}
</script>
