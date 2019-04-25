<template>
  <!-- APOD CARD -->
  <div class="card mt-2">
    <div class="card-body">
      <h5 class="card-title">{{apod.title}}</h5>
      <div>
        <!-- FOR VIDEO -->
        <iframe width="498" height="332" :src="apod.url" v-if="apod.mediaType == 'video'"></iframe>

        <!-- FOR IMAGE -->
        <img
          class="card-img-top"
          v-bind:src="apod.url"
          alt="Card image cap"
          v-if="apod.mediaType == 'image'"
        >
      </div>
      <div class="mt-3">
        <router-link :to="`/dashboard/${apod._id}`">
          <a href="#" class="btn btn-primary mr-2">See detail</a>
        </router-link>
        <a class="btn btn-danger" v-on:click="deleteApod(apod._id)">Delete</a>
        <router-link :to="`/update/${apod._id}`">
          <a style="margin-left:8px" href="#" class="btn btn-primary mr-2">Edit</a>
        </router-link>
      </div>
    </div>
  </div>
  <!-- END OF APOD CARD -->
</template>

<script>
export default {
  props: ["apod"],
  methods: {
    deleteApod(ApodId) {
      this.$emit("deleteApod", ApodId);
    }
  }
};
</script>

<style>
</style>
