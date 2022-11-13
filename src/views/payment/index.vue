<template>
  <Header>
    <template #sidelink>
      <div class="col-lg-6 col-5 text-right">
        <router-link class="btn btn-sm btn-neutral" to="/payment/create"
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
              <h3 class="mb-0">Payment List</h3>
            </div>
            <!-- Light table -->
            <div class="table-responsive">
              <table class="table align-items-center table-flush">
                <thead class="thead-light">
                  <tr>
                    <th scope="col" class="sort" data-sort="name">No</th>
                    <th scope="col" class="sort" data-sort="name">Customer</th>
                    <th scope="col" class="sort" data-sort="budget">Amount</th>
                    <th scope="col" class="sort" data-sort="budget">Adjust</th>
                    <th scope="col" class="sort" data-sort="budget">Due</th>
                    <th scope="col">Date</th>
                    <th scope="col" class="sort" data-sort="status">Status</th>
                    <th scope="col" class="text-right">Action</th>
                  </tr>
                </thead>
                <tbody class="list">
                  <tr v-for="(row, index) in payments" :key="index">
                    <td class="budget">
                      <router-link :to="`/payment/${row.id}`">{{
                        index + 1
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
                    <td>{{ row.amount }}</td>
                    <td>{{ row.adjust }}</td>
                    <td>{{ row.dues }}</td>
                    <td>{{ row.payment_date }}</td>
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
import { payments, removePayment } from '@/api/payment'
import moment from 'moment'
import { ref } from 'vue'
import { payment } from '@/models/status'

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
      status: payment,
      customers: null,
      payments: [],
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
    this.getPayments()
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
    getPayments () {
      payments(this.query)
        .then(response => {
          this.payments = response.data
          this.pageCount = response.meta.last_page
          this.payments.forEach(element => {
            element.payment_date = moment(String(element.payment_date)).format(
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
      this.getPayments()
    },
    remove (payment) {
      if (confirm('Do you really want to delete?')) {
        removePayment(payment).then(response => {
          if (response.success) {
            this.getPayments()
          }
        })
      }
    }
  }
}
</script>
