<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/invoice/create"
          >New</router-link
        >
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
              <h3 class="mb-0">Invoice List</h3>
            </div>
            <!-- Light table -->
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="sort" data-sort="name">Serial</th>
                    <th scope="col" class="sort" data-sort="name">Customer</th>
                    <th scope="col" class="sort" data-sort="budget">Amount</th>
                    <th scope="col">Date</th>
                    <th scope="col" class="sort" data-sort="status">Status</th>
                    <th scope="col" class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr v-for="(row, index) in invoices" :key="index">
                    <td class="budget">
                      <router-link :to="`/invoice/${row.id}`">{{
                        row.id
                      }}</router-link>
                    </td>
                    <th scope="row">
                      <div class="media align-items-center">
                        <div>
                          {{ row.customer.name }}
                        </div>
                        <div class="media-body">
                          <span class="name mb-0 text-sm">
                            &nbsp;({{ row.customer.mobile }})
                          </span>
                        </div>
                      </div>
                    </th>
                    <td class="budget">
                      {{ row.amount }}
                    </td>
                    <td class="budget">
                      {{ row.for_date }}
                    </td>
                    <td>
                      <span :class="status[row.status]" class="badge badge-pill">{{ row.status }}</span>
                    </td>
                    <td class="text-right">
                      <button
                        class="btn btn-icon btn-danger"
                        @click="remove(row)"
                      >
                        <span class="btn-inner--icon"
                          ><i class="ni ni-fat-remove"></i
                        ></span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Card footer -->
            <div class="card-footer py-4">
              <v-pagination
                class="pagination justify-content-end mb-0"
                active-color="#5e72e4"
                v-model="page"
                :range-size="1"
                :pages="pageCount"
                @update:modelValue="updateHandler"
              />
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
import { invoices, removeInvoice } from '@/api/invoice'
import moment from 'moment'
import { ref } from 'vue'
import { invoice } from '@/models/status'

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
      status: invoice,
      customers: null,
      invoices: [],
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
    this.getCustomers()
    this.getInvoices()
  },
  methods: {
    getCustomers () {
      customerList(this.term)
        .then(response => {
          this.customers = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getInvoices () {
      invoices(this.query)
        .then(response => {
          this.invoices = response.data
          this.pageCount = response.meta.last_page
          this.invoices.forEach(element => {
            element.for_date = moment(String(element.for_date)).format(
              'MMM, YYYY'
            )
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateHandler () {
      this.query.page = this.page
      this.getInvoices()
    },
    remove (invoice) {
      if (confirm('Do you really want to delete?')) {
        removeInvoice(invoice).then(response => {
          if (response.success) {
            this.getInvoices()
          }
        })
      }
    }
  }
}
</script>
