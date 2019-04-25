<template>
  <div class="container my-4">
    <!-- DATEPICKER -->
    <div class="jumbotron">
      <div class="row justify-content-center text-center">
        <div class="col-6">
          <div>
            <h2>Edit Astronomy Picture</h2>
            <p>Please input date, etc.</p>
            <form method="post" v-on:submit.prevent="editApod" class="input-group">
              <Datepicker v-model="date"></Datepicker>
              <div class="input-group-append">
                <button class="btn btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- END OF DATEPICKER -->
  </div>
</template>

<script>
import Datepicker from "vuejs-datepicker";
import axios from "axios";
let server = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  created() {
    const { ApodId } = this.$route.params;
    let token = localStorage.getItem("token");
    if (token) this.getDetails(ApodId);
  },
  components: {
    Datepicker
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    getDetails(ApodId) {
      let token = localStorage.getItem("token");
      server
        .get(`/apods/${ApodId}`, { headers: { token } })
        .then(({ data }) => {
          const { date } = data;
          this.date = date;
        })
        .catch(err => {
          if (err) this.$router.push("/404");
          console.log(err);
        });
    },

    // HANYA BISA UPDATE TANGGAL SAJA :(
    editApod() {
      let token = localStorage.getItem("token");
      let { date } = this;
      date = new Date(date).toISOString().slice(0, 10);
      const { ApodId } = this.$route.params;
      server
        .put(`/apods/${ApodId}`, { date }, { headers: { token } })
        .then(({ data }) => {
          console.log("berhasil");
        })
        .catch(err => {
          console.log(err);
        });
    }
    // ----------------------------------------
  }
};
</script>

<style>
</style>
