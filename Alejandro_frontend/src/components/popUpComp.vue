<template>
<div class="q-pa-md">
    <q-dialog v-model="dialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <span class="q-ml-sm">{{ props.message }}</span>
        </q-card-section>


        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn flat label="Aceptar" color="primary" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
<template>
<script setup>
import { ref, props } from 'vue'

const props = { 
	message: String,
	dialog: bool
}

const dialog = props.dialog

</script>
