<template>
  <div v-if="loaderActive" class="loader-page">
    <loader :active="loaderActive" message="" />
  </div>

  <div v-if="!loaderActive" class="hello">
    <nav
      id="navbar-main"
      class="navbar navbar-horizontal navbar-transparent navbar-main navbar-expand-lg navbar-light"
    >
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <img src="assets/img/brand/analyticalj.png" />
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-collapse"
          aria-controls="navbar-collapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="navbar-collapse navbar-custom-collapse collapse"
          id="navbar-collapse"
        >
          <div class="navbar-collapse-header">
            <div class="row">
              <div class="col-6 collapse-brand">
                <a href="dashboard.html">
                  <img src="assets/img/brand/analyticalj.png" />
                </a>
              </div>
              <div class="col-6 collapse-close">
                <button
                  type="button"
                  class="navbar-toggler"
                  data-toggle="collapse"
                  data-target="#navbar-collapse"
                  aria-controls="navbar-collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">
                <i class="ni ni-tv-2 text-primary"></i>
                <span class="nav-link-text">Dashboard</span>
              </router-link>
            </li>
            <!-- <li class="nav-item">
              <a href="login.html" class="nav-link">
                <span class="nav-link-inner--text">Login</span>
              </a>
            </li>
            <li class="nav-item">
              <a href="register.html" class="nav-link">
                <span class="nav-link-inner--text">Register</span>
              </a>
            </li> -->
          </ul>
          <hr class="d-lg-none" />
          <ul class="navbar-nav align-items-lg-center ml-lg-auto">
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://www.facebook.com/creativetim"
                target="_blank"
                data-toggle="tooltip"
                data-original-title="Like us on Facebook"
              >
                <i class="fab fa-facebook-square"></i>
                <span class="nav-link-inner--text d-lg-none">Facebook</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://www.instagram.com/creativetimofficial"
                target="_blank"
                data-toggle="tooltip"
                data-original-title="Follow us on Instagram"
              >
                <i class="fab fa-instagram"></i>
                <span class="nav-link-inner--text d-lg-none">Instagram</span>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://twitter.com/creativetim"
                target="_blank"
                data-toggle="tooltip"
                data-original-title="Follow us on Twitter"
              >
                <i class="fab fa-twitter-square"></i>
                <span class="nav-link-inner--text d-lg-none">Twitter</span>
              </a>
            </li>
            <!-- <li class="nav-item">
              <a
                class="nav-link nav-link-icon"
                href="https://github.com/creativetimofficial"
                target="_blank"
                data-toggle="tooltip"
                data-original-title="Star us on Github"
              >
                <i class="fab fa-github"></i>
                <span class="nav-link-inner--text d-lg-none">Github</span>
              </a>
            </li>
            <li class="nav-item d-none d-lg-block ml-lg-4">
              <a
                href="https://www.creative-tim.com/product/argon-dashboard-pro?ref=ad_upgrade_pro"
                target="_blank"
                class="btn btn-neutral btn-icon"
              >
                <span class="btn-inner--icon">
                  <i class="fas fa-shopping-cart mr-2"></i>
                </span>
                <span class="nav-link-inner--text">Upgrade to PRO</span>
              </a>
            </li> -->
          </ul>
        </div>
      </div>
    </nav>
    <div class="main-content">
      <!-- Header -->
      <div class="header bg-gradient-primary py-7 py-lg-8 pt-lg-9">
        <div class="container">
          <div class="header-body text-center mb-7">
            <div class="row justify-content-center">
              <div class="col-xl-5 col-lg-6 col-md-8 px-5">
                <h1 class="text-white">Welcome!</h1>
                <p class="text-lead text-white">
                  Use these awesome forms to login or create new account in your
                  project for free.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="separator separator-bottom separator-skew zindex-100">
          <svg
            x="0"
            y="0"
            viewBox="0 0 2560 100"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              class="fill-default"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>
      <!-- Page content -->
      <div class="container mt--8 pb-5">
        <div class="row justify-content-center">
          <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary border-0 mb-0">
              <!-- <div class="card-header bg-transparent pb-5">
                <div class="text-muted text-center mt-2 mb-3">
                  <small>Sign in with</small>
                </div>
                <div class="btn-wrapper text-center">
                  <a href="#" class="btn btn-neutral btn-icon">
                    <span class="btn-inner--icon"
                      ><img src="assets/img/icons/common/github.svg"
                    /></span>
                    <span class="btn-inner--text">Github</span>
                  </a>
                  <a href="#" class="btn btn-neutral btn-icon">
                    <span class="btn-inner--icon"
                      ><img src="assets/img/icons/common/google.svg"
                    /></span>
                    <span class="btn-inner--text">Google</span>
                  </a>
                </div>
              </div> -->
              <div class="card-body px-lg-5 py-lg-5">
                <div class="text-center text-muted mb-4">
                  <small>Please enter your valid credentials</small>
                </div>
                <div v-if="fetchError" class="alert alert-danger">
                  <button type="button" aria-hidden="true" data-dismiss="alert" class="close">
                    <i class="nc-icon nc-simple-remove"></i>
                  </button>
                  <span><b> Error: </b> {{ fetchError }}</span>
                </div>
                <form role="form" @submit.prevent="submitForm">
                  <div class="form-group mb-3">
                    <div
                      class="input-group input-group-merge input-group-alternative"
                    >
                      <div class="input-group-prepend" :class="{ error: v$.login.email.$errors.length }">
                        <span class="input-group-text"
                          ><i class="ni ni-email-83"></i
                        ></span>
                      </div>
                      <input
                        v-model="login.email"
                        class="form-control"
                        placeholder="Email"
                        type="email"
                      />
                    </div>
                    <div class="input-errors" v-for="error of v$.login.email.$errors" :key="error.$uid">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                  <div class="form-group">
                    <div
                      class="input-group input-group-merge input-group-alternative"
                    >
                      <div class="input-group-prepend" :class="{ error: v$.login.password.$errors.length }">
                        <span class="input-group-text"
                          ><i class="ni ni-lock-circle-open"></i
                        ></span>
                      </div>
                      <input
                        v-model="login.password"
                        class="form-control"
                        placeholder="Password"
                        type="password"
                      />
                    </div>
                    <div class="input-errors" v-for="error of v$.login.password.$errors" :key="error.$uid">
                      <div class="error-msg">{{ error.$message }}</div>
                    </div>
                  </div>
                  <div
                    class="custom-control custom-control-alternative custom-checkbox"
                  >
                    <input
                      class="custom-control-input"
                      id=" customCheckLogin"
                      type="checkbox"
                    />
                    <label class="custom-control-label" for=" customCheckLogin">
                      <span class="text-muted">Remember me</span>
                    </label>
                  </div>
                  <div class="text-center">
                    <loader :active="loaderActive" message="" />
                    <button v-if="!loaderActive" type="submit" class="btn btn-primary my-4">Sign in</button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6">
                <a href="#" class="text-light"
                  ><small>Forgot password?</small></a
                >
              </div>
              <div class="col-6 text-right">
                <a href="#" class="text-light"
                  ><small>Create new account</small></a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <footer class="py-5" id="footer-main">
      <div class="container">
        <div class="row align-items-center justify-content-xl-between">
          <div class="col-xl-6">
            <div class="copyright text-center text-xl-left text-muted">
              &copy; 2020
              <a
                href="https://www.creative-tim.com"
                class="font-weight-bold ml-1"
                target="_blank"
                >Creative Tim</a
              >
            </div>
          </div>
          <div class="col-xl-6">
            <ul
              class="nav nav-footer justify-content-center justify-content-xl-end"
            >
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com"
                  class="nav-link"
                  target="_blank"
                  >Creative Tim</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://www.creative-tim.com/presentation"
                  class="nav-link"
                  target="_blank"
                  >About Us</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="http://blog.creative-tim.com"
                  class="nav-link"
                  target="_blank"
                  >Blog</a
                >
              </li>
              <li class="nav-item">
                <a
                  href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md"
                  class="nav-link"
                  target="_blank"
                  >MIT License</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { config } from '@/utils/config'
import Loader from '../../components/Loader.vue'
import loaderMixin from '../../../src/mixins/loader'

const url = config.api_url

export default {
  name: 'Login',
  components: {
    Loader
  },
  mixins: [loaderMixin],
  mounted () {
    if (getToken()) {
      this.$router.push('/')
    }

    this.showLoader()
    setTimeout(() => {
      this.hideLoader()
    }, 500)

    $(document).ready(function () {
      $('body').addClass('bg-default')
    })
  },
  setup: () => ({ v$: useVuelidate() }),
  data () {
    return {
      loading: false,
      login: {
        email: undefined,
        password: undefined
      },
      fetchError: null
    }
  },
  validations () {
    return {
      login: {
        email: { required, email },
        password: { required }
      }
    }
  },
  methods: {
    async submitForm () {
      this.showLoader()
      const result = await this.v$.$validate()
      if (result) {
        axios
          .post(`${url}login`, this.login)
          .then(response => {
            const result = response.data
            if (result.success) {
              this.loading = false
              this.fetchError = null
              localStorage.setItem('token', result.data.token)
              localStorage.setItem(
                'userInfo',
                JSON.stringify(result.data.user)
              )
              this.$router.push('/')
            } else {
              this.loading = false
              this.showError('Wrong user or password')
            }
          })
          .catch(error => {
            this.loading = false
            console.log(error)
            this.showError('Something went wrong!')
          })
      }
      this.hideLoader()
    },
    showError (msg) {
      this.fetchError = msg
    }
  }
}
</script>
<style>
.loader-page {
  padding: 25%;
}
</style>
