<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/customer">
          List
        </router-link>
      </div>
    </template>
  </Header>
  <Content>
    <template #content>
      <div class="row">
        <div class="col-xl-4 order-xl-2">
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
                <a href="#" class="btn btn-sm btn-info  mr-4 ">Connect</a>
                <a href="#" class="btn btn-sm btn-default float-right">Message</a>
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
        </div>
        <div class="col-xl-8 order-xl-1">
          <div class="card">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">View Customer</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <div class="card-body">
                <h6 class="heading-small text-muted mb-4">Customer information</h6>
                <div class="pl-lg-4">
                 <div class="row">
                   <label for="name" class="col-md-4">Company</label>
                   <div class="col-md-8">{{ customer.company_name }}</div>
                 </div>
                 <div class="row">
                   <label for="name" class="col-md-4">Name</label>
                   <div class="col-md-8">{{ customer.name }}</div>
                 </div>
                 <div class="row">
                   <label for="email" class="col-md-4">Email</label>
                   <div class="col-md-8">{{ customer.email }}</div>
                 </div>
                 <div class="row">
                   <label for="email" class="col-md-4">Mobile</label>
                   <div class="col-md-8">{{ customer.mobile }}</div>
                 </div>
                 <div class="row">
                   <label for="email" class="col-md-4">Balance</label>
                   <div class="col-md-8">{{ customer.balance }}</div>
                 </div>
                </div>
            </div>
          </div>
          <div class="card card-profile">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Due Invoices</h3>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <table class="table stripe hover nowrap">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Invoice No</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row,index) in customer.due_invoices" :key="index">
                            <td class="budget">{{ index + 1 }}</td>
                            <td>
                              <router-link :to="`/invoice/${row.id}`">{{ row.id }}</router-link>
                            </td>
                            <td>{{ row.amount }}</td>
                            <td>{{ row.paid }}</td>
                            <td>{{ row.due }}</td>
                        </tr>
                        <tr style="font-weight: bolder">
                          <td colspan="3" class="text-center">Total</td>
                          <td>{{ customer.balance }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Content>
</template>

<script>
import Header from '@/views/layout/header.vue'
import Content from '@/views/layout/content.vue'
import { updateCustomer, customer, customerList } from '@/api/customer'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue'
import { CustomerModel } from '@/models/customer'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Header,
    Content
  },
  setup () {
    const month = ref({
      month: new Date().getMonth(),
      year: new Date().getFullYear()
    })
    return {
      month,
      v$: useVuelidate()
    }
  },
  data () {
    return {
      loading: false,
      customers: null,
      search: '',
      type: {
        monthly: 'Monthly',
        yearly: 'Yearly',
        onetime: 'Onetime'
      },
      customer: new CustomerModel(),
      form: {
        id: Number,
        name: String,
        email: String,
        mobile: String,
        balance: Number,
        company_name: String,
        billing_type: String,
        bill_start_date: String
      },
      errorMsg: null,
      successMsg: null
    }
  },
  created () {
    this.getCustomers()
    this.getCustomer(this.$route.params.id)
  },
  validations () {
    return {
      month: { required },
      form: {
        amount: { required },
        paid: { required }
      }
    }
  },
  methods: {
    getCustomer (customerId) {
      customer(customerId).then(response => {
        const data = response.data
        this.form = data
        this.customer = data
        console.log(this.customer)
      })
    },
    getCustomers () {
      customerList(this.search)
        .then(response => {
          this.customers = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    async submit () {
      const myMonth = (this.month.month + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      this.form.for_date = this.month.year + '-' + myMonth + '-01'
      const result = await this.v$.$validate()
      if (result) {
        updateCustomer(this.form)
          .then(response => {
            if (response.success) {
              this.loading = false
              this.alert(null, response.message)
            } else {
              this.loading = false
              this.alert(response.error)
            }
          })
          .catch(err => {
            this.loading = false
            console.log(err)
            this.alert('Something went wrong!')
          })
      }
    },
    alert (error = null, success = null) {
      this.errorMsg = error
      this.successMsg = success
      setTimeout(() => {
        this.errorMsg = null
        this.successMsg = null
      }, 2000)
    }
  }
}
</script>
