<template>
  <div class="home">
    <navigation />
    <h1>  {{ Home }}</h1>
    <p v-if="userLogged">User loggued: {{ userLogged }}</p>
    <p v-if="token">User token: {{ token }}</p>
    <p v-if="refresh">User refresh: {{ refresh }}</p>
    <p v-if="group">User Group: {{ group }}</p>
  </div>
</template>

<script setup>
import Navigation from "src/components/NavigationComp.vue";
import auth from "src/auth";
import { computed, ref } from "vue";
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const Home = ref(t('Home'))

const userLogged = computed(() => {
  return auth.getUserLogged()
});
const token = computed(() => {
  return auth.getToken()
});
const refresh = computed(() => {
  return auth.getRefresh()
});
const group = computed(() => {
  const data = auth.getUser(userLogged)
  console.log(data)
  return "en proceso"
});



</script>
