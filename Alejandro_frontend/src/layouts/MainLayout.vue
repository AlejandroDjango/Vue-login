<template>
  <div class="home">
    <navigation/>
    <h1>Home</h1>
    <p v-if="userLogged">User loggued: {{userLogged}}</p>
  </div>
</template>

<script>
import Navigation from "src/components/Navigation";
import auth from "src/logic/auth";
export default {
  name: "HomeLayout",
  components: {
    navigation: Navigation
  },
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  }
};
</script>

<style>
</style>
