<script setup>
import LoginSchema from 'src/utils/ValidateLogin';
import { ref, onMounted, useTemplateRef } from 'vue';
import BackButton from '../navigations/BackButton.vue';


const model = defineModel({
  email: '',
  password: '',
  rememberMe: true
});

const props = defineProps({
  rememberMe: {
    type: Boolean,
    default: false
  },
  emailBoxPlaceholder: {
    type: String,
    default: 'Email'
  },
  submitHandler: {
    type: Function,
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  showSignupOption: {
    type: Boolean,
    default: false
  }
});
const error = ref({});

const handleSubmit = () => {
  const validation = LoginSchema.safeParse(model.value);
  if (!validation.success) {
    error.value = validation.error.format();
    return;
  }
  props.submitHandler();
  error.value = {};
};

const emailInput = useTemplateRef('emailInputRef');
onMounted(() => {
  emailInput.value?.focus();
});

</script>

<template>
  <div class="container">
    <div class="back-button-container">
      <BackButton />
    </div>
    <q-form class="login-form" @submit="handleSubmit()">
      <span class="login-title">Login</span>

      <q-input
        filled
        v-model="model.email"
        :label="props.emailBoxPlaceholder"
        class="data-input"
        type="email"
        :error="!!error?.email?._errors?.length"
        :error-message="error?.email?._errors?.[0]"
        ref="emailInputRef"
      />

      <q-input
      filled
      v-model="model.password"
      label="Password"
      type="password"
      class="data-input"
      :error="!!error?.password?._errors?.length"
      :error-message="error?.password?._errors?.[0]"
    />
    
      <router-link to="/voter" class="text-primary text-semibold">Forgot Password?</router-link>
      <div class="remember-me">
        <q-checkbox v-model="model.rememberMe" label="Remember Me" />
      </div>
      <q-btn type="submit" class="button bg-primary text-white">
        <template v-if="props.isLoading">
          <q-spinner size="20px" />
        </template>
        <span v-else>Login</span>
      </q-btn>
      <p v-if="props.showSignupOption" style="margin-top: 20px;">Don't have an account? <router-link to="/register" class="text-primary text-bold">Sign up</router-link></p>
    </q-form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
}
.back-button-container{
  position: absolute;
  top: 20px;
  left: 20px;
}

.login-title {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}
.login-form {
  width: 400px;
  padding: 30px 20px;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid rgb(214, 214, 214);
}
.data-input {
  width: 100%;
}
.remember-me {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.button {
  width: 100%;
}

</style>
