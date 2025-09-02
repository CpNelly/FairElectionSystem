<script setup>
import LoginForm from 'src/components/auth/LoginForm.vue'
import { useAuthStore } from 'src/stores/auth-store'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

import { ref } from 'vue'

const loginData = ref({
  email: '',
  password: '',
  rememberMe: false,
})

const isLoading = ref(false)

const submitHandler = () => {
  isLoading.value = true
  authStore.login(loginData.value);
  // Simulate an API call
  setTimeout(() => {  
    isLoading.value = false
    router.push({ path: '/', query: { username: loginData.value.email.split('@')[0] } })
  }, 2000)
}
</script>

<template>
  <LoginForm
    v-model="loginData"
    email-box-placeholder="Voters Email or ID"
    :isLoading="isLoading"
    :submitHandler="submitHandler"
    :show-signup-option="true"
  />
</template>
