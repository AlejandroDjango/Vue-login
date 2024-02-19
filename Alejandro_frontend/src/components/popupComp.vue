<template>
  <div class="q-pa-md">
    <q-dialog v-model="isOpenInputModel">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="warning" text-color="white" />
          <ul>
            <li
              v-for="m in props.message"
              :key="m.id"
              class="q-ml-sm"
            >
              {{ m }}
            </li>
          </ul>
        </q-card-section>

        <!-- Notice v-close-popup -->
        <q-card-actions align="right">
          <q-btn
            flat
            label="Aceptar"
            color="primary"
            @click="emit('modal-close')"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, computed } from "vue";
import { onClickOutside } from "@vueuse/core";

const props = defineProps({
  message: Array,
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close", ("update-is-open", Boolean)]);

const target = ref(null);
onClickOutside(target, () => emit("modal-close"));

const isOpenInputModel = computed({
  get() {
    return props.isOpen;
  },

  set(newValue) {
    emit("update-is-open", newValue);
  },
});
</script>
