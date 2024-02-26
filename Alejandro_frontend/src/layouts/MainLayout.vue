<template>
  <div class="home">
    <navigation />
    <h1>  {{ Home }}</h1>
  </div>
</template>

<script setup>
import Navigation from "src/components/NavigationComp.vue";

import { ref } from "vue";
import { useI18n } from "vue-i18n"
const { t } = useI18n()

const Home = ref(t('Home'))

</script>
