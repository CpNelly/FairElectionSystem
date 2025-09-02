<template>
  <div class="q-pt-sm text-subtitle2 text-accent text-weight-bold" v-if="timeRemaining.total > 0">
    <q-icon name="schedule" class="q-mr-xs" />
    {{ timeRemaining.days }}d {{ timeRemaining.hours }}h {{ timeRemaining.minutes }}m {{ timeRemaining.seconds }}s
  </div>
  <div class="text-subtitle2 text-green-7 text-weight-bold" v-else-if="electionDate">
    Election in progress!
  </div>
  <div class="text-caption text-grey-6" v-else>
    Date not announced.
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';

const props = defineProps({
  electionDate: {
    type: [String, Date],
    required: true,
  },
});

const timeRemaining = ref({
  total: 0,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
});

let timer = null;

const calculateTimeRemaining = () => {
  const now = new Date();
  const targetDate = new Date(props.electionDate);
  const total = targetDate - now;

  if (total <= 0) {
    clearInterval(timer);
    timeRemaining.value = { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return;
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  timeRemaining.value = { total, days, hours, minutes, seconds };
};

onMounted(() => {
  if (props.electionDate) {
    calculateTimeRemaining();
    timer = setInterval(calculateTimeRemaining, 1000);
  }
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

// Watch for changes in the electionDate prop
watch(() => props.electionDate, (newDate) => {
  if (timer) {
    clearInterval(timer);
  }
  if (newDate) {
    calculateTimeRemaining();
    timer = setInterval(calculateTimeRemaining, 1000);
  }
}, { immediate: true });
</script>
