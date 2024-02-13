<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/payment">
          List
        </router-link>
        <a href="#" class="btn btn-sm btn-neutral">Edit</a>
      </div>
    </template>
  </Header>
  <Loader :active="loaderActive" message="" />
  <Content v-if="!loaderActive">
    <template #content>
      <div class="row">
        <div class="col-xl-4 order-xl-2">
          <div class="card card-profile">
            <img src="assets/img/theme/img-1-1000x600.jpg" alt="Image placeholder" class="card-img-top" />
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img src="assets/img/theme/user.png" class="rounded-circle" />
                  </a>
                </div>
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
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
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h5 class="h3">
                  Jessica Jones<span class="font-weight-light">, 27</span>
                </h5>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>Bucharest, Romania
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>Solution Manager -
                  Creative Tim Officer
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>University of Computer
                  Science
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8 order-xl-1">
          <div class="card">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Edit profile</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <alert :errorMsg="errorMsg" :successMsg="successMsg" />
              <form role="form" @submit.prevent="submit">
                <h6 class="heading-small text-muted mb-4">Payment information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-username">Customer</label>
                        <select class="form-control" v-model="form.customer_id">
                          <option value="">- Select -</option>
                          <option v-for="option in customers" :value="option.id" :key="option.id">
                            {{ option.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email">Payment method</label>
                        <select class="form-control" v-model="form.method">
                          <option value="">- Select -</option>
                          <option v-for="(option, key) in method" :value="key" :key="key">
                            {{ option }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group" :class="{ error: v$.date.$errors.length }">
                        <label class="form-control-label" for="input-first-name">Date</label>
                        <Datepicker v-model="date" :enableTimePicker="false" autoApply></Datepicker>
                        <div class="input-errors" v-for="error of v$.date.$errors" :key="error.$uid">
                          <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group" :class="{ error: v$.form.amount.$errors.length }">
                        <label class="form-control-label" for="input-last-name">Amount</label>
                        <input type="number" class="form-control" placeholder="Amount" v-model="form.amount" />
                        <div class="input-errors" v-for="error of v$.form.amount.$errors" :key="error.$uid">
                          <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center">
                    <button type="submit" class="btn btn-primary my-4">Save</button>
                  </div>
                </div>
              </form>
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
import { customerList } from '@/api/customer'
import { storePayment } from '@/api/payment'
import { required } from '@vuelidate/validators'
import Alert from '@/components/Alert'
import useVuelidate from '@vuelidate/core'
import Loader from '../../components/Loader.vue'
import loaderMixin from '../../../src/mixins/loader'

export default {
  name: 'CreatePayment',
  props: {
    msg: String
  },
  components: {
    Alert,
    Header,
    Content,
    Loader
  },
  mixins: [loaderMixin],
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data () {
    return {
      customers: null,
      search: '',
      method: {
        cash: 'Cash',
        Bank: 'Bank',
        Bkash: 'Bkash'
      },
      date: null,
      form: {
        customer_id: '',
        method: '',
        payment_date: null,
        amount: ''
      },
      errorMsg: null,
      successMsg: null
    }
  },
  validations () {
    return {
      date: { required },
      form: {
        amount: { required }
      }
    }
  },
  methods: {
    getCustomers () {
      customerList(this.search)
        .then(response => {
          this.customers = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getDate (date) {
      const myDate = new Date(date)
      const myMonth = (myDate.getMonth() + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })
      const myDay = (myDate.getDate()).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      return myDate.getFullYear() + '-' + myMonth + '-' + myDay
    },
    async submit () {
      this.showLoader()
      this.form.payment_date = this.getDate(this.date)
      const result = await this.v$.$validate()
      if (result) {
        storePayment(this.form)
          .then(response => {
            if (response.success) {
              this.alert(null, response.message)
              this.$router.push('/payment')
            } else {
              this.alert(response.error)
            }
          })
          .catch(err => {
            console.log(err)
            this.alert('Something went wrong!')
          })
      }
      this.hideLoader()
    },
    alert (error = null, success = null) {
      this.errorMsg = error
      this.successMsg = success
      setTimeout(() => {
        this.errorMsg = null
        this.successMsg = null
      }, 2000)
    }
  },
  mounted () {
    this.getCustomers()
  }
}
</script>
