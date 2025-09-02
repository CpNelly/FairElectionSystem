<script setup>
import { ref } from 'vue'
//import  SignupSchema  from '../../utils/ValidateSignup.js'
import { Step1Schema, Step2Schema, Step3Schema, Step4Schema } from '../../utils/ValidateSignup.js'
import BackButton from '../../components/navigations/BackButton.vue';


const step = ref(1);
const hasVotersCard = ref(false);
const isPwdVisible = ref(false);

const genderOptions = ['Male', 'Female'];

const regionOptions = [
  'North West',
  'South',
  'East',
  'West',
  'Litoral',
  'Centre',
  'North',
  'South-West',
  'Adamawa',
  'Far North'
];

const formData = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  email: '',
  phone: '',
  dob: '',
  pob: '',
  gender: '',
  region: '',
  birthRegion: '',
  streetAddress: '',
  city: '',
  idCardNumber: '',
  voterCardNumber: '',
  password: '',
  confirmPassword: ''
})

const error = ref(null);



const validateStep = () => {
  let schema, data;
  if (step.value === 1) {
    schema = Step1Schema;
    data = {
      firstName: formData.value.firstName,
      middleName: formData.value.middleName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      phone: formData.value.phone,
      dob: formData.value.dob,
      pob: formData.value.pob,
      gender: formData.value.gender,
      birthRegion: formData.value.birthRegion,
    };
  } else if (step.value === 2) {
    schema = Step2Schema;
    data = {
      streetAddress: formData.value.streetAddress,
      city: formData.value.city,
      region: formData.value.region,
    };
  } else if (step.value === 3) {
    schema = Step3Schema;
    data = {
      idCardNumber: formData.value.idCardNumber,
      voterCardNumber: formData.value.voterCardNumber,
    };
  } else if (step.value === 4) {
    schema = Step4Schema;
    data = {
      password: formData.value.password,
      confirmPassword: formData.value.confirmPassword,
    };
  }
  const result = schema.safeParse(data);
  if (!result.success) {
    error.value = result.error.format();
    return false;
  }
  error.value = {};
  return true;
};


const onStepperSubmit = () => {
  if (!validateStep()) return; // Don't advance if not valid
  if (step.value < 4) {
    step.value += 1;
  } else {
    console.log(formData.value);
    alert('Form submitted successfully!');
  }
};
</script>

<template>
<q-form class="stepper" @submit.prevent="onStepperSubmit()">
    <div class="back-button-container">
      <BackButton />
    </div>
    <!-- <h5 class="text-primary">Voter Registration</h5> -->
    <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
      flat
    >

    //first step
      <q-step :name="1"
      title="Basic Information"
      icon="person"
      :done="step > 1"
      >
        <div class="name-container">
          <q-input type="text" label="First Name" class="name-input" required filled v-model="formData.firstName" :error="!!error?.firstName?._errors?.length" :error-message="error?.firstName?._errors?.[0]"/>
          <q-input type="text" label="Middle Name(optional)" filled class="name-input" v-model="formData.middleName" :error="!!error?.middleName?._errors?.length" :error-message="error?.middleName?._errors?.[0]"/>
          <q-input type="text" label="Last Name" filled class="name-input" required v-model="formData.lastName" :error="!!error?.lastName?._errors?.length" :error-message="error?.lastName?._errors?.[0]"/>
        </div>
         <div class="name-container">
          <q-input type="email" label="Enter Your Email" class="contact-input" required filled v-model="formData.email" :error="!!error?.email?._errors?.length" :error-message="error?.email?._errors?.[0]"/>
          <q-input type="tel"  mask="(###) ###-###" label="Phone Number" class="contact-input" required filled v-model="formData.phone" :error="!!error?.phone?._errors?.length" :error-message="error?.phone?._errors?.[0]"/>
        </div>
        <div class="name-container">
          <q-input type="date" label="Date of Birth" class="name-input" required filled v-model="formData.dob" :error="!!error?.dob?._errors?.length" :error-message="error?.dob?._errors?.[0]"/>
          <q-input type="text" label="Place of Birth" class="name-input" required filled v-model="formData.pob" :error="!!error?.pob?._errors?.length" :error-message="error?.pob?._errors?.[0]"/>
          <q-select class="name-input" label="gender" :options="genderOptions" v-model="formData.gender" required filled :error="!!error?.gender?._errors?.length" :error-message="error?.gender?._errors?.[0]"/>
        </div>
        <q-select class="region-input" label="Region of Birth" :options="regionOptions" v-model="formData.birthRegion" required filled :error="!!error?.birthRegion?._errors?.length" :error-message="error?.birthRegion?._errors?.[0]"/>
      </q-step>

      //second step
      <q-step :name="2"
      title="Address Info"
      icon="location_on"
      :done="step > 2">
         <div class="name-container">
          <q-input type="text" label="Street Address" class="name-input" required filled v-model="formData.streetAddress" :error="!!error?.streetAddress?._errors?.length" :error-message="error?.streetAddress?._errors?.[0]"/>
          <q-input type="text" label="City" filled class="name-input" v-model="formData.city" :error="!!error?.city?._errors?.length" :error-message="error?.city?._errors?.[0]"/>
          <q-select class="name-input" label="Region" :options="regionOptions" v-model="formData.region" required filled :error="!!error?.region?._errors?.length" :error-message="error?.region?._errors?.[0]"/>
        </div>
      </q-step>

      //third step
      <q-step :name="3"
      title="Voter's Details"
      icon="badge"
      :done="step > 3">
        <div class="name-container flex">
          <q-checkbox label="Already have a Voters Card?" v-model="hasVotersCard"/>
          <div class="id-input-container">
            <q-input type="text" label="Enter your Id Card Number" required filled v-model="formData.idCardNumber" :error="!!error?.idCardNumber?._errors?.length" :error-message="error?.idCardNumber?._errors?.[0]"/>
            <q-input type="text" label="Enter your Voter's Card Number" required filled v-model="formData.voterCardNumber" v-if="hasVotersCard" :error="!!error?.voterCardNumber?._errors?.length" :error-message="error?.voterCardNumber?._errors?.[0]"/>
          </div>
        </div>
      </q-step>

      //forth step
      <q-step :name="4"
      title="Password and Confirmation"
      icon="lock">
        <div class="name-container">

          <q-input
            :type="isPwdVisible ? 'text' : 'password'"
            label="Enter Your Password"
            class="contact-input"
            required
            filled
            v-model="formData.password"
            :error="!!error?.password?._errors?.length"
            :error-message="error?.password?._errors?.[0]"
          />
          <q-input
            :type="isPwdVisible ? 'text' : 'password'"
            label="Confirm Your Password"
            class="contact-input"
            required
            filled
            v-model="formData.confirmPassword"
            :error="!!error?.confirmPassword?._errors?.length"
            :error-message="error?.confirmPassword?._errors?.[0]"
          />
        </div>
        <q-checkbox v-model="isPwdVisible" label="Show Password" class="text-primary"/>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="flex justify-between items-center mt-6">
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" type="button" icon="arrow_back"/>
           <p>Already have an account? <router-link to="/login" class="text-primary text-bold">Login</router-link></p>
          <q-btn  color="primary" :label="step === 4 ? 'Finish' : 'Continue'"  type="submit" icon="arrow_forward"/>
        </q-stepper-navigation>
      </template>
     </q-stepper>
    </q-form>
</template>



<style scoped>
.stepper{
  background-color: black;
  background-color: white;
  padding: 0 50px;
}
.back-button-container{
  padding: 20px 0px;
}
.name-container{
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 0px;
}
.name-container .name-input{
  width: 32%;
}
.contact-input{
  width: 49%;
}
.region-input{
  margin-top: 4px;
}
.id-input-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
