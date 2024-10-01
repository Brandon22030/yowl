<template>
  <NavBar />
  <AddPost />
  <ModalUpdatePost v-if="popup" :post_id="post" :is-open="popup" @close-modal="closeModal" />

  <aside
    id="separator-sidebar"
    class="z-0 fixed top-[5rem] w-64 h-auto rounded-sm"
    aria-label="Sidebar"
  >
    <div
      class="h-full px-3 py-4 bg-gray-50 items-center dark:bg-gray-800 rounded-tl-none rounded-tr-[16px] rounded-br-[16px] rounded-bl-none"
    >
      <h2 class="text-xl font-bold mb-[2rem]">Category Name</h2>

      <div
        class="mb-[1rem] w-full h-[3rem] bg-[#1977a2] items-center flex justify-center text-white font-bold rounded-[10px] cursor-pointer hover:bg-opacity-4"
      >
        <p>{{ categoriesStore.category.name }}</p>
      </div>
    </div>
  </aside>
  <div class="p-4 py-1 sm:ml-64">
    <div
      v-for="post in PostStore.posts"
      :key="post.id"
      :postId="post.id"
      class="p-4 py-0 rounded-lg dark:border-gray-700"
    >
      <!-- <RouterLink :to="`/comments/${post.id}`"> -->
      <div
        v-if="$route.params.id == post.categories_id"
        class="mb-[1rem] p-4 flex h-[20rem] gap-4 rounded-xl bg-gray-50 dark:bg-gray-800"
      >
        <img
          :src="src + post.image"
          class="h-[15rem] bg-cover w-[15rem] my-auto object-cover object-center"
          alt="no image"
        />

        <div class="mr-[5rem] w-full mt-[1rem] flex justify-between">
          <div class="w-[40rem]">
            <div>
              <div class="flex justify-between">
                <h1 class="text-2xl">{{ post.title }}</h1>
                <div class="flex gap-2" v-if="post.user_id == userInfo.id">
                  <!-- UPDATE ICON -->
                  <svg
                    @click="openModal(post)"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 hover:text-[#B9E185] cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>

                  <!-- TRASH ICON -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    @click="deletePost(post.id)"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6 hover:text-red-600 cursor-pointer"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </div>
              </div>

              <!-- LINK -->
              <div class="group relative flex py-[1rem] items-center text-black text-sm font-bold">
                <div
                  class="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[0%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md"
                >
                  <div class="bg-[#B9E185] flex items-center gap-1 p-2 rounded-md">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      height="30px"
                      width="30px"
                      xmlns="http://www.w3.org/2000/svg"
                      class="stroke-zinc-600"
                    >
                      <circle stroke-linejoin="round" r="9" cy="12" cx="12"></circle>
                      <path
                        stroke-linejoin="round"
                        d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21"
                      ></path>
                      <path
                        stroke-linejoin="round"
                        d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21"
                      ></path>
                      <path stroke-linejoin="round" d="M3 12H21"></path>
                      <path stroke-linejoin="round" d="M19.5 7.5H4.5"></path>
                      <g filter="url(#filter0_d_15_556)">
                        <path stroke-linejoin="round" d="M19.5 16.5H4.5"></path>
                      </g>
                      <defs>
                        <filter
                          color-interpolation-filters="sRGB"
                          filterUnits="userSpaceOnUse"
                          height="3"
                          width="17"
                          y="16"
                          x="3.5"
                          id="filter0_d_15_556"
                        >
                          <feFlood result="BackgroundImageFix" flood-opacity="0"></feFlood>
                          <feColorMatrix
                            result="hardAlpha"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            type="matrix"
                            in="SourceAlpha"
                          ></feColorMatrix>
                          <feOffset dy="1"></feOffset>
                          <feGaussianBlur stdDeviation="0.5"></feGaussianBlur>
                          <feColorMatrix
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                            type="matrix"
                          ></feColorMatrix>
                          <feBlend
                            result="effect1_dropShadow_15_556"
                            in2="BackgroundImageFix"
                            mode="normal"
                          ></feBlend>
                          <feBlend
                            result="shape"
                            in2="effect1_dropShadow_15_556"
                            in="SourceGraphic"
                            mode="normal"
                          ></feBlend>
                        </filter>
                      </defs>
                    </svg>
                    <a :href="post.linked_url" class="text-[#1977A2]" target="_blank">
                      {{ post.linked_url }}
                    </a>
                    <!-- <span>Uiverse.io</span> -->
                  </div>
                  <div
                    class="shadow-md bg-[#B9E185] absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
                  ></div>
                  <div
                    class="rounded-md group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0"
                  >
                    <div
                      class="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"
                    ></div>
                  </div>
                </div>

                <a
                  :href="post.linked_url"
                  class="shadow-md flex items-center group-hover:gap-2 bg-[#B9E185] p-3 rounded-full cursor-pointer duration-300"
                >
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    height="20px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-black"
                  >
                    <path
                      stroke-linejoin="round"
                      stroke-linecap="round"
                      d="M15.4306 7.70172C7.55045 7.99826 3.43929 15.232 2.17021 19.3956C2.07701 19.7014 2.31139 20 2.63107 20C2.82491 20 3.0008 19.8828 3.08334 19.7074C6.04179 13.4211 12.7066 12.3152 15.514 12.5639C15.7583 12.5856 15.9333 12.7956 15.9333 13.0409V15.1247C15.9333 15.5667 16.4648 15.7913 16.7818 15.4833L20.6976 11.6784C20.8723 11.5087 20.8993 11.2378 20.7615 11.037L16.8456 5.32965C16.5677 4.92457 15.9333 5.12126 15.9333 5.61253V7.19231C15.9333 7.46845 15.7065 7.69133 15.4306 7.70172Z"
                    ></path></svg
                  ><span class="text-[0px] group-hover:text-sm duration-300"
                    >Check The Website</span
                  >
                </a>
              </div>

              <!-- <div class="flex items-center gap-2">
                <h1 class="text-lg font-bold underline underline-offset-2">Link:</h1>
                <a :href="post.linked_url" class="text-[#1977A2]">
                  {{ post.linked_url.substring(0, 50) }}
                </a>
              </div> -->
              <p class="break-all">{{ post.content.substring(0, 200) }}</p>

              <RouterLink
                :to="`/comments/${post.id}`"
                class="hover:text-[#1977A2] hover:font-bold box-content w-[6rem]"
              >
                <p class="mt-[1rem] font-bold">Read more...</p>
              </RouterLink>
            </div>

            <div class="mt-[1rem]" v-for="user in usersStore.users" :key="user.id">
              <div v-if="user.id == post.user_id" class="flex items-center gap-5">
                <img src="/images/feedback.png" alt="" class="h-10 w-10 rounded-full" />
                <p class="font-bold">{{ user.name }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePostStore } from '@/stores/posts'
import { ref, onMounted } from 'vue'
import AddPost from '../Posts Components/AddPost.vue'
import NavBar from '../NavBar.vue'
import { useAuthStore } from '@/stores/authStore'
import { userStore } from '@/stores/userStore'
import ModalUpdatePost from '../Posts Components/ModalUpdatePost.vue'
import { useRoute } from 'vue-router'
import { CategoriesStore } from '@/stores/categoryStore'

const categoriesStore = CategoriesStore()

const ID = useRoute().params.id

const src = 'http://127.0.0.2:8000/storage/'

const user = JSON.parse(localStorage.getItem('userInfo'))

const usersStore = userStore()

const authStore = useAuthStore()

const PostStore = usePostStore()

const popup = ref(false)

const post = ref({})

function openModal(postId) {
  popup.value = true

  post.value = postId

}

async function deletePost(postId) {
  
  await PostStore.deleteapost(postId)

  await PostStore.seeposts()
}

function closeModal() {
  popup.value = false
}
const userInfo = JSON.parse(localStorage.getItem('userInfo'))


onMounted(async () => {
  await PostStore.seeposts()
  await usersStore.fetchAllUsers()

  await categoriesStore.fetchCategory(ID)

})
</script>

<style lang="scss" scoped></style>
