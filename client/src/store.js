import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './router'
import swal from 'sweetalert'

let server = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false
  },
  mutations: {
    login(state, payload) {
      state.isLoggedIn = true
    },
    logout(state, payload) {
      state.isLoggedIn = false
      router.push('/')
      localStorage.clear()
      swal('Bye!')
    }
  },
  actions: {
    verify({ commit }) {
      let token = localStorage.getItem('token')
      server
        .post('/verify', { token }, { headers: { token } })
        .then(({ data }) => {
          commit('login')
          console.log(data.message)
        })
        .catch((err) => {
          console.log(err)
          const { message } = err.response.data
          swal("Error!", message, "error");
          localStorage.clear()
        })

    },
    login({ commit }, payload) {
      const { email, password } = payload
      server
        .post('/login', {
          email,
          password
        })
        .then(({ data }) => {
          const { details, message, token } = data
          const { id, email } = details
          localStorage.setItem('token', token)
          localStorage.setItem('id', id)
          localStorage.setItem('email', email)
          commit('login')
          router.replace('/dashboard')
          swal('Success!', message, 'success')
        })
        .catch((err) => {
          const { message } = err.response.data
          swal('Oops...', message, 'error')
        })
    }
  }
})
