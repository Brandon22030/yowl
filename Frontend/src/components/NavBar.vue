<template>
  <header class="bg-white">
    <div
      class="mx-auto h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 flex justify-between"
    >
      <div>
        <RouterLink class="block text-teal-600" to="/homeland">
          <img src="/images/feedback.png" alt="logo" class="h-[4rem]" />
        </RouterLink>
      </div>

      <div class="flex items-center gap-10 justify-end md:justify-between">
        <div class="flex gap-10 items-center">
          <nav aria-label="Global" class="hidden md:block">
            <ul class="flex items-center gap-6 text-sm">
              <li class="flex items-center gap-1">
                <div class="rounded-full p-1 hover:bg-[#1977A2] hover:text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                </div>

                <a class="text-black transition hover:text-[#1977A2] font-black" href="#"> Home </a>
              </li>
            </ul>
          </nav>

          <!-- SEARCH BAR -->
          <div class="relative">
            <input
              class="appearance-none pl-10 transition-colors bg-[#EEF0F2] rounded-full w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:border-2 focus:border-[#1977A2] focus:bg-white"
              v-model="query"
              id="username"
              type="text"
              placeholder="Search..."
            />

            <div class="absolute left-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <!-- USER NAME -->
        <div class="flex items-center gap-4">
          <div class="main-container w-px h-[50px] bg-[#d1d8db] relative mx-auto my-0"></div>
          <div class="sm:flex sm:gap-4 items-center">
            <div class="flex items-center gap-3">
              <img
                src=""
                alt=""
                class="w-10 h-10 object-cover object-center rounded-full inline-block border-2 border-gray-200 bg-gray-100"
              />
              <p class="font-bold">{{ user.name }}</p>
            </div>
            <!-- <button
              class="block rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-700"
              @click="logout"
            >
              Logout
            </button> -->

            <div @click="display">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
                class="size-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      @click="close"
      v-if="toggle"
      class="shadow-lg z-10 rounded-lg main-container mt-[0.5rem] w-[280px] h-[10rem] text-center right-1 mx-auto my-0 fixed bg-white"
    >
      <RouterLink :to="`/UsersDashboard/${user.id}`">
        <p
          class="text-center cursor-pointer font-semibold mt-[1rem] py-[1rem] hover:bg-[#C38D9E] hover:text-white"
        >
          My Profile
        </p>
      </RouterLink>

      <p
        @click="logout"
        class="text-center cursor-pointer font-semibold mt-[1rem] py-[1rem] hover:bg-[#C38D9E] hover:text-white"
      >
        Logout
      </p>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { usePostStore } from '@/stores/posts'

const PostStore = usePostStore()

import { ref, onMounted } from 'vue'

import { useRouter } from 'vue-router'

const query = ref('')

const toggle = ref(false)

function display() {
  toggle.value = !toggle.value
}

function close() {
  toggle.value = false
}

const user = JSON.parse(localStorage.getItem('userInfo'))

const router = useRouter()

const authStore = useAuthStore()

const logout = () => {
  authStore.logout()

  router.push({ name: 'home' })
}

onMounted(async () => {
  PostStore.seeposts()
})

// SEARCH BAR FUNCTION
function filterPostit() {
  return PostStore.posts.filter((post) =>
    post.title.toLowerCase().includes(query.value.toLowerCase())
  )
}
</script>

<style lang="scss" scoped></style>
