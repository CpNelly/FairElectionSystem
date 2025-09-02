<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  headerMessage: String,
  descriptionMessage: String,
})
</script>

<template>
  <q-card class="header-card q-pa-lg text-center rounded-lg shadow-3 text-primary">
    <div class="text-h4 text-weight-bold">{{ props.headerMessage }}</div>
    <div class="text-subtitle1 q-mt-sm text-grey-8">
      {{ props.descriptionMessage }}
    </div>
  </q-card>
</template>

<style lang="scss">
.header-card {
  border-radius: 12px; // More rounded corners
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); // Stronger, modern shadow
  margin-bottom: 2rem;
  //background: linear-gradient(45deg, #e3f2fd, #bbdefb); // A subtle gradient
  background-color: #92d4cdce;
}

@media (max-width: $breakpoint-sm-max) {
  .header-card .text-h4 {
    font-size: 1.8rem;
  }
  .header-card .text-subtitle1 {
    font-size: 0.9rem;
  }
  .q-pa-md {
    padding: 1rem !important;
  }
  .search-input {
    width: 100%;
    margin-top: 10px;
  }
  .q-card-actions .q-btn {
    width: 100%;
    margin-bottom: 8px;
  }
}
</style>
