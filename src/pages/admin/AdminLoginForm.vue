<script setup>

import LoginForm from 'src/components/auth/LoginForm.vue';
import { ref } from 'vue';

const loginData = ref({
  email: '',
  password: '',
});

const isLoading = ref(false);

const submitHandler = () => {
  isLoading.value = true;
  // Simulate an API call
  setTimeout(() => {
    alert('Login data submitted');
    isLoading.value = false;
  }, 2000);
};


</script>

<template>
    <LoginForm
    v-model="loginData"
    email-box-placeholder="Admin Email or ID"
    :isLoading="isLoading"
    :submitHandler="submitHandler"
    :show-signup-option="false"
    />
</template>
