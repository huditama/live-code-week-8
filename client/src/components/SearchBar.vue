<template>
  <!-- SEARCH FORM -->
  <form method="post" v-on:submit.prevent="filter" class="input-group mb-3">
    <input
      type="text"
      name="search"
      id="search"
      class="form-control"
      autocomplete="off"
      placeholder="Search..."
      v-model="search"
    >
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="submit">Search</button>
    </div>
  </form>
  <!-- END OF SEARCH FORM -->
</template>

<script>
export default {
  data() {
    return {
      search: ""
    };
  },
  methods: {
    filter() {
      this.$emit("search", this.search);
    }
  }
};
</script>

<style>
</style>
