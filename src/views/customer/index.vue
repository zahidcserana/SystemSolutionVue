<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/customer/create">New</router-link>
        <a href="#" class="btn btn-sm btn-neutral">Edit</a>
      </div>
    </template>
  </Header>
  <Content>
    <template #content>
      <div class="row">
        <div class="col">
          <div class="card">
            <!-- Card header -->
            <div class="card-header border-0">
              <h3 class="mb-0">Customer List</h3>
            </div>
            <!-- Light table -->
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="sort" data-sort="name">Serial</th>
                    <th scope="col" class="sort" data-sort="name">Company</th>
                    <th scope="col" class="sort" data-sort="name">Contact</th>
                    <th scope="col" class="sort" data-sort="budget">Email</th>
                    <th scope="col" class="sort" data-sort="budget">Mobile</th>
                    <th scope="col" class="sort" data-sort="budget">Balance</th>
                    <th scope="col">From</th>
                    <th scope="col" class="sort" data-sort="status">Bill Type</th>
                    <th scope="col" class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr v-for="(row, index) in customers" :key="index">
                    <td class="budget">
                      <router-link :to="`/customer/${row.id}`">
                       <span class="btn-inner--icon">
                          <i class="ni ni-active-40">
                            &nbsp;{{index + 1}}
                          </i>
                        </span>
                      </router-link>
                    </td>
                    <td>{{ row.company_name }}</td>
                    <td>{{ row.name }}</td>
                    <td>{{ row.email }}</td>
                    <td>{{ row.mobile }}</td>
                    <td>{{ row.balance }}</td>
                    <td>{{ row.bill_start_date }}</td>
                    <td>
                      <span class="badge badge-dot mr-4">
                        <i class="bg-warning"></i>
                        <span class="status">{{ row.billing_type }}</span>
                      </span>
                    </td>
                    <td class="text-right">
                      <button class="btn btn-icon btn-info" @click="view(row)">
                        <span class="btn-inner--icon">
                          <i class="ni ni-user-run"></i>
                        </span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Card footer -->
            <div class="card-footer py-4">
              <v-pagination class="pagination justify-content-end mb-0" active-color="#5e72e4" v-model="page" :range-size="1" :pages="pageCount" @update:modelValue="updateHandler" />
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
import { customers, customerList } from '@/api/customer'
import moment from 'moment'
import { ref } from 'vue'

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
    const page = ref(1)
    return { page }
  },
  data () {
    return {
      customerList: null,
      customers: [],
      term: '',
      pageCount: 1,
      query: {
        term: '',
        page: 1,
        limit: 20
      }
    }
  },
  created () {
    this.getCustomerList()
    this.getCustomers()
  },
  methods: {
    getCustomerList () {
      customerList(this.term)
        .then(response => {
          this.customerList = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getCustomers () {
      customers(this.query)
        .then(response => {
          this.customers = response.data
          this.pageCount = response.meta.last_page
          this.customers.forEach(element => {
            element.bill_start_date = moment(String(element.bill_start_date)).format(
              'MMM d, YYYY'
            )
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateHandler () {
      this.query.page = this.page
      this.getCustomers()
    },
    view (customer) {
      console.log(customer)
    }
  }
}
</script>
<style>
.btn-link {
  padding: 5%;
}
</style>
