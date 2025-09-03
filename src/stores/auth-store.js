import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    formData: {
      email: '',
      password: '',
      rememberMe: false,
    },
  }),

  actions: {
    login(data) {
      this.formData.email = data.email
      this.formData.password = data.password
      this.formData.rememberMe = data.rememberMe
      // Perform login logic
    },
    logout() {
      this.formData.email = ''
      this.formData.password = ''
      this.formData.rememberMe = false
      // Perform logout logic
    },
  },
})
