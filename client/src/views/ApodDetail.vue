<template>
  <!-- APOD DETAILS -->
  <div class="card" id="detail">
    <div class="card-header">Detail</div>
    <div class="card-body">
      <h2 class="card-title">
        <u>{{apod.title}}</u>
      </h2>
      <div class="card-text">
        <h4>Description</h4>
        {{apod.desc}}
        <br>
        <br>
        <br>
        <h4>Date of picture</h4>
        {{apod.date}}
      </div>
    </div>
  </div>
  <!-- END OF APOD DETAILS -->
</template>

<script>
import axios from "axios";
let server = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  created() {
    const { ApodId } = this.$route.params;
    this.getDetails(ApodId);
  },
  data() {
    return {
      apod: {}
    };
  },
  methods: {
    getDetails(ApodId) {
      let token = localStorage.getItem("token");
      server
        .get(`/apods/${ApodId}`, { headers: { token } })
        .then(({ data }) => {
          this.apod = data;
        })
        .catch(err => {
          if (err) this.$router.push("/404");
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
