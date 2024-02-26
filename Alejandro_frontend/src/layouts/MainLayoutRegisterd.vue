<template>
  <div class="home">
    <navigation />
    <h1>  {{ Home }}</h1>
    <p v-if="userLogged">User loggued: {{ userLogged }}</p>
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
  return auth.getAll();
});
const group = computed(() => {
  return "en proceso"
});

onMounted(
  // blalala
)


</script>
