<template>
  <div class="p-4 pt-0 pb-1 sm:ml-64 max-w-8xl">
    <div class="p-4 pb-0 rounded-lg dark:border-gray-700">
      <div
        class="flex items-center justify-center h-14 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <p class="flex justify-center items-center gap-2 text-2xl font-black dark:text-gray-500">
          All Posts
        </p>
      </div>
    </div>
  </div>

  <div class="flex overflow-x-hidden">
    <div class=" max-w-7xl">
      <div class="p-4 py-1 ml-[16rem] mr-[6rem]" v-for="post in PostStore.posts" :key="post.id">
        <div class="p-4 py-0 rounded-lg dark:border-gray-700">
          <div class="p-4 flex w-auto h-[20rem] gap-4 rounded-xl bg-gray-50 dark:bg-gray-800">
            <img
              :src="src + post.image"
              class="h-[15rem] bg-cover w-[15rem] my-auto object-cover object-center"
              alt="no image"
            />

            <div class="mr-[5rem] w-full mt-[1rem] flex justify-between">
              <div class="w-[40rem]">
                <div>
                  <div class="flex justify-between">
                    <h1 class="text-2xl">
                      {{ post.title }}
                    </h1>
                    <div
                      v-for="categorie in categoriesStore.categories"
                      :key="categorie.id"
                      class="items-end"
                    >
                      <p
                        v-if="categorie.id == post.categories_id"
                        class="text-center bg-[#B9E185] text-white font-bold p-2 rounded-lg sm:mr-14"
                      >
                        {{ categorie.name }}
                      </p>
                    </div>
                  </div>

                  <!-- LINK -->
                  <div
                    class="group relative flex py-[1rem] items-center text-black text-sm font-bold"
                  >
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

                  <p class="break-all sm:mr-10">{{ post.content.substring(0, 200) }}</p>

                  <RouterLink
                    :to="`/comments/${post.id}`"
                    class="hover:text-[#1977A2] hover:font-bold box-content w-[6rem]"
                  >
                    <p class="mt-[1rem] w-[6rem] font-bold">Read more...</p>
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
  </div>
    <div class="flex">
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue'
import { usePostStore } from '@/stores/posts'
import { CategoriesStore } from '@/stores/categoryStore'
import { userStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'

const usersStore = userStore()

const authStore = useAuthStore()

const userInfo = JSON.parse(localStorage.getItem('userInfo'))

const src = 'http://127.0.0.2:8000/storage/'


const PostStore = usePostStore()

const categoriesStore = CategoriesStore()

// const selected = computed(() => categoriesStore.selectedCategory);

// watch(selected, async (newCategory) => {

//     if(newCategory) {

//         await PostStore.fetchPostsByCategories(newCategory)

//     }

// });

const username = usersStore.user


onMounted(async () => {
  await PostStore.seeposts()

  await usersStore.fetchAllUsers()
})

// const posts = computed(() => PostStore.posts);
</script>

<style lang="scss" scoped></style>
