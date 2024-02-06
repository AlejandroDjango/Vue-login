<template>
  <div class="home">
    <navigation />
    <h1>Home</h1>
    <p v-if="userLogged">User loggued: {{ userLogged }}</p>
  </div>
</template>

<script setup>
import Navigation from "src/components/NavigationComp.vue";
import auth from "src/auth";
import { computed } from "vue";

const userLogged = computed(() => {
  return auth.getUserLogged();
});
</script>
