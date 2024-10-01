<template>
  <ModalAddPost v-if="popup" :is-open="popup" @close-modal="closeModal" />
  <div @click="openModal" class="p-4 sm:ml-64">
    <div class="p-4 pb-0 rounded-lg dark:border-gray-700">
      <div class="cursor-pointer  flex items-center justify-start h-14 pl-[1rem] rounded-lg bg-gray-50 dark:bg-gray-800">
        <p class="flex justify-center items-center gap-2 text-2xl font-black dark:text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="white"
            class="size-10 rounded-full bg-[#1977A2]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>

          Add New Post ...
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>

  import ModalAddPost from './ModalAddPost.vue';

  import { ref } from 'vue'

  const popup = ref(false)

  function openModal(){

    popup.value = true

  }

  function closeModal(){

    popup.value = false

  }


</script>

<style lang="scss" scoped></style>
