<template>
  <div class="container my-4">
    <div class="row justify-content-center">
      <div class="col-4">
        <div class="card mb-4">
          <div class="card-header text-center">Login</div>
          <div class="card-body">
            <!-- LOGIN FORM -->
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <label for="email">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="email"
                >
                <small
                  id="emailHelp"
                  class="form-text text-muted"
                >We'll never share your email with anyone else.</small>
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                >
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
            <!-- END OF LOGIN FORM -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      this.$store.dispatch("login", {
        email,
        password
      });
    }
  }
};
</script>

<style>
</style>
