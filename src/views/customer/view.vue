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
          <Info :customer="customer" />
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
import { customer } from '@/api/customer'
import { CustomerModel } from '@/models/customer'
import Info from './info.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Header,
    Content,
    Info
  },
  data () {
    return {
      search: '',
      type: {
        monthly: 'Monthly',
        yearly: 'Yearly',
        onetime: 'Onetime'
      },
      customer: new CustomerModel()
    }
  },
  created () {
    this.getCustomer(this.$route.params.id)
  },
  methods: {
    getCustomer (customerId) {
      customer(customerId).then(response => {
        const data = response.data
        this.form = data
        this.customer = data
        console.log(this.customer)
      })
    }
  }
}
</script>
