<template>
  <div id="app">
    <!-- NAVBAR -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">From NASA with love</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <!-- HOME BUTTON -->
            <router-link to="/">
              <li class="nav-item">
                <a class="nav-link">Home</a>
              </li>
            </router-link>
            <!-- END OF HOME BUTTON -->
            <!-- DASHBOARD BUTTON -->
            <router-link to="/dashboard" v-if="isLoggedIn">
              <li class="nav-item">
                <a class="nav-link">Dashboard</a>
              </li>
            </router-link>
            <!-- END OF DASHBOARD BUTTON -->
          </ul>
        </div>

        <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
          <ul class="navbar-nav ml-auto">
            <!-- LOGIN BUTTON -->
            <router-link to="/login" v-if="!isLoggedIn">
              <li class="nav-item">
                <a class="nav-link">Login</a>
              </li>
            </router-link>
            <!-- END OF LOGIN BUTTON -->
            <!-- REGISTER BUTTON -->
            <router-link to="/register" v-if="!isLoggedIn">
              <li class="nav-item">
                <a class="nav-link">Register</a>
              </li>
            </router-link>
            <!-- END OF REGISTER BUTTON -->
            <!-- LOGOUT BUTTON -->
            <li class="nav-item" v-if="isLoggedIn" v-on:click="logout">
              <a class="nav-link">Logout</a>
            </li>
            <!-- END OF LOGOUT BUTTON -->
          </ul>
        </div>
      </div>
    </nav>
    <!-- END OF NAVBAR -->
    <router-view/>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  created() {
    let token = localStorage.getItem("token");
    if (token) this.$store.dispatch("verify");
  },
  computed: {
    ...mapState(["isLoggedIn"])
  },
  methods: {
    logout() {
      this.$store.commit("logout");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.nav-link {
  color: white;
}
</style>
