<template>
  <!-- DATEPICKER -->
  <div class="jumbotron">
    <div class="row justify-content-center text-center">
      <div class="col-6">
        <div>
          <h2>Add Astronomy Picture</h2>
          <p>Please input date, etc.</p>
          <form method="post" v-on:submit.prevent="addApod" class="input-group">
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
</template>

<script>
import Datepicker from "vuejs-datepicker";

export default {
  components: {
    Datepicker
  },
  data() {
    return {
      date: ""
    };
  },
  methods: {
    addApod() {
      let datePick = new Date(this.date).toISOString().substring(0, 10);
      this.$emit("addApod", datePick);
    }
  }
};
</script>

<style>
</style>
