<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/invoice">
          List
        </router-link>
        <router-link class="btn btn-sm btn-neutral" to="/invoice/create">
          Add
        </router-link>
      </div>
    </template>
  </Header>
  <Loader :active="loaderActive" message="" />
  <Content v-if="!loaderActive">
    <template #content>
      <div class="row">
        <div class="col-xl-4 order-xl-2">
          <Info :customer="customer" />
        </div>
        <div class="col-xl-8 order-xl-1">
          <div class="card">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Edit Invoice</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <div class="card-body">
              <alert :errorMsg="errorMsg" :successMsg="successMsg" />
              <form role="form" @submit.prevent="submit">
                <h6 class="heading-small text-muted mb-4">Invoice information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-username"
                          >Customer</label
                        >
                        <select class="form-control" v-model="form.customer_id">
                          <option value="">- Select -</option>
                          <option
                            v-for="option in customers"
                            :value="option.id"
                            :key="option.id"
                          >
                            {{ option.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-email"
                          >Invoice type</label
                        >
                        <select class="form-control" v-model="form.type">
                          <option value="">- Select -</option>
                          <option
                            v-for="(option, key) in type"
                            :value="key"
                            :key="key"
                          >
                            {{ option }}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div
                        class="form-group"
                        :class="{ error: v$.month.$errors.length }"
                      >
                        <label class="form-control-label" for="input-first-name"
                          >Date</label
                        >
                        <Datepicker v-model="month" monthPicker></Datepicker>
                        <div
                          class="input-errors"
                          v-for="error of v$.month.$errors"
                          :key="error.$uid"
                        >
                          <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div
                        class="form-group"
                        :class="{ error: v$.form.amount.$errors.length }"
                      >
                        <label class="form-control-label" for="input-last-name"
                          >Amount</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Amount"
                          v-model="form.amount"
                        />
                        <div
                          class="input-errors"
                          v-for="error of v$.form.amount.$errors"
                          :key="error.$uid"
                        >
                          <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="form-group">
                        <label class="form-control-label" for="input-first-name"
                          >Status</label
                        >
                        <span class="status">: {{ form.status }}</span>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div
                        class="form-group"
                        :class="{ error: v$.form.paid.$errors.length }"
                      >
                        <label class="form-control-label" for="input-last-name"
                          >Paid</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Paid"
                          v-model="form.paid"
                        />
                        <div
                          class="input-errors"
                          v-for="error of v$.form.paid.$errors"
                          :key="error.$uid"
                        >
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
import { updateInvoice, invoice } from '@/api/invoice'
import Datepicker from '@vuepic/vue-datepicker'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { ref } from 'vue'
import Alert from '@/components/Alert'
import Info from '../customer/info.vue'
import Loader from '../../components/Loader.vue'
import loaderMixin from '../../../src/mixins/loader'

export default {
  name: 'InvoiceEdit',
  props: {
    msg: String
  },
  components: {
    Alert,
    Header,
    Content,
    Datepicker,
    Info,
    Loader
  },
  mixins: [loaderMixin],
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
      customers: null,
      customer: Object,
      search: '',
      type: {
        monthly: 'Monthly',
        yearly: 'Yearly',
        onetime: 'Onetime'
      },
      form: {
        id: undefined,
        customer_id: '',
        type: '',
        for_date: '',
        amount: '',
        paid: '0',
        status: ''
      },
      errorMsg: null,
      successMsg: null
    }
  },
  created () {
    this.getCustomers()
    this.getInvoice(this.$route.params.id)
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
    getInvoice (invoiceId) {
      invoice(invoiceId).then(response => {
        const data = response.data
        this.customer = data.customer
        this.form.id = data.id
        this.form.customer_id = data.customer.id
        this.form.type = data.type
        this.form.for_date = data.for_date
        this.form.amount = data.amount
        this.form.paid = data.paid
        this.form.status = data.status

        const d = new Date(this.form.for_date)
        this.month = ref({
          month: d.getMonth(),
          year: d.getFullYear()
        })
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
      this.showLoader()

      const myMonth = (this.month.month + 1).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
      })

      this.form.for_date = this.month.year + '-' + myMonth + '-01'
      const result = await this.v$.$validate()
      if (result) {
        updateInvoice(this.form)
          .then(response => {
            if (response.success) {
              this.customer = response.data.customer
              this.alert(null, response.message)
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
  }
}
</script>
