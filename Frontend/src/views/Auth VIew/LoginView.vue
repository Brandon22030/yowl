<template>
  <div :style="{ backgroundImage: 'url(/images/pattern.png)' }" class="bg-cover bg-center w-full px-4 py-16 sm:px-6 lg:px-8 bg-white">
    <div class="mx-auto px-4 sm:px-6">
      <div class="mx-auto max-w-lg">
      <img src="/images/feedback.png" alt="feedback" class="h-[5rem] mx-auto" />
        <h1 class="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">Welcome Back !</h1>

        <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
          Please, log in to your account.
        </p>


        <form
          @submit.prevent="login"
          class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p class="text-center text-lg font-medium">Sign in to your account</p>

          <div>
            <label for="email">Email</label>

            <div class="relative">
              <input
                v-model="email"
                type="email"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter email"
              />
              <span v-if="error.email" class="text-red-600 error-message">{{ error.email }}</span>
            </div>
          </div>

          <div>
            <label for="password">Password</label>

            <div class="relative">
              <input
                v-model="password"
                type="password"
                class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter password"
              />
              <span v-if="error.password" class="text-red-600 error-message">{{ error.password }}</span>
            </div>
          </div>

          <button
            type="submit"
            class="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
          >
            Log in
          </button>

          <p class="text-center text-sm text-gray-500">
            No account?
            <RouterLink to="/register" class="text-blue-700 hover:font-bold"
              >Register</RouterLink
            >
          </p>
          <div v-if="formError">{{ formError }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '@/stores/authStore'

import { useRouter } from 'vue-router'

const error = ref({ email: '', password: '' })

const formError = ref('')

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

const email = ref('')

const password = ref('')

const authStore = useAuthStore()

const login = async () => {
  validateemail()
  validatepassword()

  if (!error.value.email && !error.value.password) {
    formError.value = ''

    const success = await authStore.login(email.value, password.value)

    if (success) {
      console.log('Login successful')

      router.push('/')

      router.push({ name: 'homeland' })
    } else {
      console.error('Login failed')
    }
  }
}
</script>

<style lang="scss" scoped></style>
