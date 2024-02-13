<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/payment">
          List
        </router-link>
        <router-link class="btn btn-sm btn-neutral" to="/payment/create">
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
          <div class="card card-profile">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Due Invoices</h3>
                </div>
                <div class="col-4 text-right" v-if="form.status !='adjusted'">
                  <button @click="adjust(form.id)" class="btn btn-sm btn-default float-right">Adjust</button>
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <table class="table stripe hover nowrap">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Amount</th>
                            <th>Paid</th>
                            <th>Due</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="row in dueInvoices" :key="row.id">
                            <td class="budget">
                              <router-link :to="`/invoice/${row.id}`">{{row.id}}</router-link>
                            </td>
                            <td>{{ row.amount }}</td>
                            <td>{{ row.paid }}</td>
                            <td>{{ row.due }}</td>
                        </tr>
                        <tr style="font-weight: bolder">
                          <td colspan="3" class="text-center">Total</td>
                          <td>{{ balance }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
          <div class="card card-profile">
            <div class="card-header">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Payment Logs</h3>
                </div>
                <div class="col-4 text-right">
                </div>
              </div>
            </div>
            <div class="card-body pt-0">
              <table class="table stripe hover nowrap">
                  <thead>
                      <tr>
                          <th>No</th>
                          <th>Invoice No</th>
                          <th>Paid Amount</th>
                          <th>Status</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(row, index) in logs" :key="row.id">
                          <td>{{ index + 1 }}</td>
                          <td class="budget">
                            <router-link :to="`/invoice/${row.invoiceId}`">{{row.invoiceId}}</router-link>
                          </td>
                          <td>{{ row.paidAmount }}</td>
                          <td>{{ row.invoiceStatus }}</td>
                      </tr>
                  </tbody>
                </table>
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
                          >Payment method</label
                        >
                        <select class="form-control" v-model="form.method">
                          <option value="">- Select -</option>
                          <option
                            v-for="(option, key) in method"
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
                        :class="{ error: v$.date.$errors.length }"
                      >
                        <label class="form-control-label" for="input-first-name"
                          >Date</label
                        >
                        <Datepicker v-model="date" :enableTimePicker="false" autoApply></Datepicker>
                        <div
                          class="input-errors"
                          v-for="error of v$.date.$errors"
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
                        <span v-if="form.status =='advanced'" class="status"> ({{ form.dues }})</span>
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div
                        class="form-group"
                        :class="{ error: v$.form.adjust.$errors.length }"
                      >
                        <label class="form-control-label" for="input-last-name"
                          >Adjust</label
                        >
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Paid"
                          v-model="form.adjust"
                        />
                        <div
                          class="input-errors"
                          v-for="error of v$.form.adjust.$errors"
                          :key="error.$uid"
                        >
                          <div class="error-msg">{{ error.$message }}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="text-center" v-if="form.status !='adjusted'">
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
import { updatePayment, payment, adjustPayment } from '@/api/payment'
import Datepicker from '@vuepic/vue-datepicker'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import Alert from '@/components/Alert'
import Loader from '../../components/Loader.vue'
import loaderMixin from '../../../src/mixins/loader'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Alert,
    Header,
    Content,
    Datepicker,
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
      dueInvoices: null,
      balance: null,
      logs: null,
      method: {
        cash: 'Cash',
        Bank: 'Bank',
        Bkash: 'Bkash'
      },
      date: null,
      form: {
        id: undefined,
        customer_id: '',
        method: '',
        payment_date: null,
        amount: '',
        adjust: 0,
        dues: 0,
        status: ''
      },
      errorMsg: null,
      successMsg: null
    }
  },
  created () {
    this.getCustomers()
    this.getPayment(this.$route.params.id)
  },
  validations () {
    return {
      date: { required },
      form: {
        amount: { required },
        adjust: { required }
      }
    }
  },
  methods: {
    setData (data) {
      this.form.id = data.id
      this.form.customer_id = data.customer.id
      this.form.method = data.method
      this.form.payment_date = data.payment_date
      this.form.amount = data.amount
      this.form.adjust = data.adjust
      this.form.dues = data.dues
      this.form.status = data.status
      this.date = this.form.payment_date
      this.logs = data.logs
      this.dueInvoices = data.customer.due_invoices
      this.balance = data.customer.balance
    },
    getPayment (paymentId) {
      payment(paymentId).then(response => {
        this.setData(response.data)
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
    adjust (id) {
      this.showLoader()

      adjustPayment(id)
        .then(response => {
          if (response.success) {
            this.setData(response.data)
            this.alert(null, response.message)
          } else {
            this.alert(response.error)
          }
        })
      this.hideLoader()
    },
    async submit () {
      this.showLoader()

      this.form.payment_date = this.getDate(this.date)
      const result = await this.v$.$validate()
      if (result) {
        updatePayment(this.form)
          .then(response => {
            if (response.success) {
              this.setData(response.data)
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
