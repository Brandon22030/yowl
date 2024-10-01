<template>

  <CreateCategory v-if="popup" :is-open="popup" @close-modal="closeModal"/>
  
  
    <aside
      id="separator-sidebar"
      class="z-0 absolute top-[5rem] w-64 h-auto rounded-sm"
      aria-label="Sidebar"
    >
  
      <div
        class="h-full px-3 py-4 bg-gray-50 items-center dark:bg-gray-800 rounded-tl-none rounded-tr-[16px] rounded-br-[16px] rounded-bl-none"
      >
  
    <h2 class="text-xl font-bold mb-[2rem]">Categories</h2>
  
            <div @click="openModal" class="mb-[1rem] w-full h-[3rem] bg-[#1977a2] items-center flex justify-center text-white font-bold rounded-[10px] cursor-pointer hover:bg-opacity-4">
  
          <span> + Add Category + </span>
  
        </div>
  
        
  
        <ul
          class="space-y-2 font-medium"
          v-for="categorie in categoriesStore.categories"
          :key="categorie.id"
        >
          <li @click="select(categorie.id)" class="cursor-pointer">
  
            <!-- Faire en sorte qu'on aille pas sur une aute vue mais plutôt afficher les postq d'une catégorie sur la même page -->
  
            <RouterLink :to="`/categories/${categorie.id}`">
  
              <div class="flex items-center p-2 text-gray-900 hover:text-white py-[1rem] dark:text-white hover:bg-[#c38d9e] rounded-[20px] dark:hover:bg-gray-700 group">
                
                <img :src="src + categorie.image" :alt="`${categorie.image}`" class="rounded-full bg-cover object-cover object-center bg-black w-[4rem] h-[4rem]">
                
                <div class="ms-3">
                  <span class="text-[]">{{ categorie.name.substring(0,20) }}</span>
                  <!-- <div v-for="post in PostStore.posts" :key="post.id">
                    <p v-if="categorie.id == post.categories_id">{{ PostStore.posts.length }} posts</p>
                  </div> -->
                </div>
  
              </div>
  
            </RouterLink>
  
          </li>
        </ul>
      </div>
    </aside>
  
  </template>
  
  <script setup>
  
    import { CategoriesStore } from '@/stores/categoryStore'
    import { RouterLink } from 'vue-router'
    import MainContent from './MainContent.vue';
    import CreateCategory from './CreateCategory.vue';
    import { ref, onMounted } from 'vue'
    import { usePostStore } from '@/stores/posts';
  
    const PostStore = usePostStore()
  

const src = 'http://127.0.0.2:8000/storage/'


    // function getImage(image){
  
    //   return process.env.VUE_APP_SERVER__URL + '/storage/' + image
  
    // }
  

    const popup = ref(false)
  
    function openModal(){
  
      popup.value = true
  
    }
  
    function closeModal(){
  
      popup.value = false
  
    }
  
    const categoriesStore = CategoriesStore()
  
    onMounted(async () => {
  
      categoriesStore.fetchCategories()
  
      // categoriesStore.selectCategoryById(1).then(response => console.log(response))
  
    })
  
  
    const select = (categoryId) =>{
  
      categoriesStore.selectCategory(categoryId)
  
    }
  
  
  
  </script>
  
  <style lang="scss" scoped></style>