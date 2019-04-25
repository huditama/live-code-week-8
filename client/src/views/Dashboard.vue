<template>
  <div class="container my-4">
    <!-- DATEPICKER -->
    <AddApodForm v-on:addApod="addApod"></AddApodForm>
    <!-- END OF DATEPICKER -->
    <hr>
    <div class="row">
      <div class="col-6">
        <!-- SEARCH FORM -->
        <SearchBar v-on:search="search"></SearchBar>
        <!-- END OF SEARCH FORM -->
        <!-- APOD CARD -->
        <ApodList
          v-for="(apod, index) in apods"
          :key="index"
          :apod="apod"
          v-on:deleteApod="deleteApod"
        />
        <!-- END OF APOD CARD -->
      </div>
      <div class="col-6">
        <!-- APOD DETAILS -->
        <router-view></router-view>
        <!-- END OF APOD DETAILS -->
      </div>
    </div>
  </div>
</template>

<script>
import ApodList from "../components/ApodList";
import AddApodForm from "../components/AddApodForm";
import SearchBar from "../components/SearchBar";
import axios from "axios";
import swal from "sweetalert";
let server = axios.create({
  baseURL: "http://localhost:3000"
});

export default {
  data() {
    return {
      apods: []
    };
  },
  components: {
    ApodList,
    AddApodForm,
    SearchBar
  },
  mounted() {
    let token = localStorage.getItem("token");
    if (token) this.getApods();
  },
  methods: {
    addApod(date) {
      let token = localStorage.getItem("token");
      server
        .post("/apods", { date }, { headers: { token } })
        .then(({ data }) => {
          const { message, createdApod } = data;
          this.apods.push(createdApod);
          swal("Success!", message, "success");
        })
        .catch(err => {
          if (err) swal("Oops...", 'You already have this image!', "error");
        });
    },
    getApods() {
      let token = localStorage.getItem("token");
      server
        .get("/apods", { headers: { token } })
        .then(({ data }) => {
          this.apods = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteApod(ApodId) {
      let token = localStorage.getItem("token");
      server
        .delete(`/apods/${ApodId}`, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.apods = this.apods.filter(apod => {
            return apod._id != ApodId;
          });
          swal("Success!", message, "success");
        })
        .catch(err => {
          console.log(err);
        });
    },
    search(keyword) {
      this.apods = this.apods.filter(apod => {
        return apod.title.toLowerCase().match(keyword);
      });
    }
  }
};
</script>

<style>
</style>
