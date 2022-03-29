<template>
  <div class="card card-profile">
    <img
      src="assets/img/theme/img-1-1000x600.jpg"
      alt="Image placeholder"
      class="card-img-top"
    />
    <div class="row justify-content-center">
      <div class="col-lg-3 order-lg-2">
        <div class="card-profile-image">
          <a href="javascript:void(0)">
            <img
              src="assets/img/theme/user.png"
              class="rounded-circle"
            />
          </a>
        </div>
      </div>
    </div>
    <div
      class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
    >
      <div class="d-flex justify-content-between">
        <a href="javascript:void(0)" class="btn btn-sm btn-info  mr-4 ">{{ type[customer.billing_type] }}</a>
        <a href="javascript:void(0)" class="btn btn-sm btn-default float-right">{{ active[customer.active] }}</a>
      </div>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <div class="col">
          <div class="card-profile-stats d-flex justify-content-center">
            <div>
              <span class="heading">22</span>
              <span class="description">Invoices</span>
            </div>
            <div>
              <span class="heading">10</span>
              <span class="description">Payments</span>
            </div>
            <div>
              <span class="heading">89</span>
              <span class="description">Dues</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <h5 class="h3">
          Join date: <span class="font-weight-light">{{ customer.bill_start_date }}</span>
        </h5>
        <div class="h5 font-weight-300">
          <i class="ni location_pin mr-2"></i>{{ customer.address }}
        </div>
        <div class="h5 mt-4">
          <i class="ni business_briefcase-24 mr-2"></i>{{ customer.company_name }}</div>
        <div>
          <i class="ni education_hat mr-2"></i>{{ customer.company_type }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    customer: Object
  },
  data () {
    return {
      type: {
        monthly: 'Monthly',
        yearly: 'Yearly',
        onetime: 'Onetime'
      },
      active: {
        1: 'Active',
        0: 'Inactive'
      }
    }
  }
}
</script>
