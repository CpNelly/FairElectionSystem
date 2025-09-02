<script setup>
import { defineEmits, defineModel, defineProps} from 'vue';

const model = defineModel('showDeleteDialog', { type: Boolean, required: true, default: false })

defineEmits(['delete', 'cancel'])

const props = defineProps({
  suffix: String
})



</script>


<template>
  <q-dialog v-model="model.showDeleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" class="q-mr-sm" />
          <span class="q-ml-sm">Are you sure you want to delete {{ props.suffix }}?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" @click="$emit('cancel')" />
          <q-btn flat label="Delete" color="negative" @click="$emit('delete')" />
        </q-card-actions>
      </q-card>
  </q-dialog>
</template>
