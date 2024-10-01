<template>

  <aside
    id="separator-sidebar"
    class="absolute top-[6rem] z-40 w-64 h-auto rounded-sm"
    aria-label="Sidebar"
  > 

    <div 
      class="h-full px-3 py-4 bg-gray-50 items-center dark:bg-gray-800 rounded-tl-none rounded-tr-[16px] rounded-br-[16px] rounded-bl-none"
    >

  <h2 class="text-xl text-center font-bold mb-[2rem]"></h2>

    <!-- <button class="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg">Responsive</button> -->


    <RouterLink :to="'/create-category'">  <div class="mb-[1rem] w-full h-[3rem] bg-[#1977a2] items-center flex justify-center text-white font-bold rounded-[10px] cursor-pointer hover:bg-opacity-4">

        <span > + Add Category +</span>

      </div></RouterLink>

      <ul
        class="space-y-2 font-medium"
        v-for="post in PostStore.posts" :key="post.id"     
      >
        <li @click="categoriesStore.fetchCategory(categorie.id)" >

          <!-- Faire en sorte qu'on aille pas sur une aute vue mais plutôt afficher les postq d'une catégorie sur la même page -->

          <RouterLink :to="`/comments/${post.id}`">

            <p class="flex gap-4 items-center p-2 text-gray-900 hover:text-white py-[1rem] dark:text-white hover:bg-[#c38d9e] rounded-[20px] dark:hover:bg-gray-700 group">
                    <img src="" alt="" class="rounded-full bg-black w-10 h-10">

                <div > <span class=" ms-3">{{ post.title }}</span></div>
            </p>

          </RouterLink>

        </li>
      </ul>
    </div>
  </aside>

  <!-- <div class="p-4 sm:ml-64">
    
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
      
      <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p class="text-2xl text-gray-400 dark:text-gray-500">
          <svg
            class="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </p>
      </div>
      
    </div>
  </div> -->
  
</template>

<script setup>
import { CategoriesStore } from '@/stores/categoryStore'
import { usePostStore } from '@/stores/posts';

import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'

const PostStore = usePostStore()
const categoriesStore = CategoriesStore()


onMounted(async() =>{

    await PostStore.seeposts()
    await categoriesStore.fetchCategories()

})

const catid = (categoryId) => {
  const category = categoriesStore.categories.find(cat => cat.id === categoryId);
  return category ? category.name : 'Unknown';
};


// onMounted(async () => {
// })
</script>

<style lang="scss" scoped></style>
