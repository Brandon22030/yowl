<template>
  <div id="background" :style="{ backgroundImage: 'url(/images/pattern.png)' }" class="bg-cover bg-center w-full px-4 py-16 sm:px-6 lg:px-8 bg-white">

    <div class="mx-auto max-w-lg">
      <img src="/images/feedback.png" alt="feedback" class="h-[5rem] mx-auto mt-[1rem]" />

      <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">CREATE ACCOUNT</h1>

      <p class="mx-auto mt-4 max-w-md text-center text-gray-500">Please, create your account.</p>

      <form @submit.prevent="register" class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
        <p class="text-center text-lg font-medium">Sign in to your account</p>

        <div>
          <label for="name" class="sr-only">Name</label>

          <div class="relative">
            <label for="name">Name</label>
            <input
              v-model="name"
              type="name"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter name"
            />
            <span v-if="error.name" class="error-message text-red-600">{{ error.name }}</span>
          </div>
        </div>

        <div>
          <label for="email" class="sr-only">Email</label>

          <div class="relative">
            <label for="email">Email</label>
            <input
              v-model="email"
              type="email"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="youremail@gmail.com"
            />
            <span v-if="error.email" class="error-message text-red-600">{{ error.email }}</span>
          </div>
        </div>

        <div>
          <label for="password" class="sr-only">Password</label>

          <div class="relative">
            <label for="password">Password</label>
            <input
              v-model="password"
              type="password"
              class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />
            <span v-if="error.password" class="error-message text-red-600">{{ error.password }}</span>
          </div>
        </div>

        <div>
          <label for="Quantity"> Enter your age </label>

          <div class="flex items-center rounded border border-gray-200">
            <input
              v-model="birthdate"
              type="date"
              class="h-10 w-full border-transparent text-center [-moz-appearance:_textfield] sm:text-sm [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />

          </div>
          <span v-if="error.birthdate" class="error-message text-red-600">{{ error.birthdate }}</span>
        </div>

        <button
          type="submit"
          class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
        >
          Sign in
        </button>

        <p class="text-center text-sm text-gray-500">
          Already have an account?
          <RouterLink to="/login" class="text-blue-700 hover:font-bold">Login here</RouterLink>
        </p>
        <div v-if="formError">{{ formError }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '@/stores/authStore'

import { useRouter } from 'vue-router'

const error = ref({ name: '', email: '', password: '', birthdate: '' })

const formError = ref('')

const age = ref('')

const validatename = () => {
  if (!name.value.trim()) {
    error.value.name = 'name is required and cannot be blank spaces.'
  } else if (name.value.length < 3) {
    error.value.name = 'name must be at least 3 characters.'
  } else {
    error.value.name = ''
  }
}

const validateemail = () => {
  if (!email.value.trim()) {
    error.value.email = 'email is required and cannot be blank spaces.'
  }
  //   else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
  //     error.value.email = 'email must be at least 3 characters.'
  //   }
  else {
    error.value.email = ''
  }
}

const validatebirthdate = () => {
    const date = new Date(birthdate.value);
    const currentDate = new Date();
    age.value = currentDate.getFullYear() - date.getFullYear()

    console.log(date.getFullYear())

    console.log(currentDate.getFullYear())

    console.log(age.value)
  if (age.value < 13 || age.value > 35 || !age.value) {
    error.value.birthdate = 'You must have between 13 and 35 year old.'
  } else {
    error.value.birthdate = ''
  }
}

const validatepassword = () => {
  if (!password.value.trim()) {
    error.value.password = 'password is required and cannot be blank spaces.'
  } else if (password.value.length < 8) {
    error.value.password = 'password must be at least 8 characters.'
  } else {
    error.value.password = ''
  }
}

const router = useRouter()

const name = ref('')

const email = ref('')

const password = ref('')

const birthdate = ref('')


const authStore = useAuthStore()

const register = async () => {
  validatename()
  validateemail()
  validatebirthdate()
  validatepassword()

  if (!error.value.name && !error.value.email && !error.value.password && !error.value.birthdate) {
    
    formError.value = ''

    const success = await authStore.register(
      name.value,
      email.value,
      age.value,
      password.value
    )

    if (success) {

      console.log('Registration successful')

      if(alert('Check your mail to verified your identity !!!')){

        router.push({ name: 'login' })

      }

    } else {
    
      console.error('Login failed')
    
    }
  
  }

}



</script>

<style scoped>

  #background{

    background-image: url('/GROUP/2.svg');

  }

</style>