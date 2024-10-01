<template>
  <div
    @click="emit('closeModal')"
    :show="isOpen"
    class="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[#00000085] h-full flex justify-center items-center"
  >
    <div @click.stop class="box-content shadow-md rounded-xl bg-white w-[30%] mx-auto items-center p-[1rem]">
      <div class="flex items-center">
        <div @click="emit('closeModal')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="3"
            stroke="currentColor"
            class="size-10 cursor-pointer text-[#B9E185]"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 class="ml-[5rem] font-bold">ADD POST</h1>
      </div>
      <form @submit.prevent="submitForm()" enctype="multipart/form-data">
        <div class="pb-[rem]">
          <label for="name">Post title</label>
          <input
            v-model="PostTitle"
            class="bg-[#808080]/20 rounded-md border-2 border-white outline-none"
            type="text"
            id="name"
            placeholder="Enter your post title..."
          />
          <span v-if="error.title" class="text-red-600">{{ error.title }}</span>
        </div>

        <div class="pb-[rem]">
          <label for="image">Post Image</label>

          <input type="file" @change="onFileChange($event)" />
          <span v-if="error.image" class="text-red-600">{{ error.image }}</span>
        </div>

        <div class="pb-[rem]">
          <label for="name">Post Content</label>
          <textarea
            v-model="PostContent"
            class="bg-[#808080]/20 rounded-md border-2 border-white outline-none w-full pl-2"
            type="text"
            id="name"
            placeholder="Enter your post title..."
            
          />
          <span v-if="error.content" class="text-red-600">{{ error.content }}</span>
        </div>

        <div class="">
          <label for="">Link of article</label>
          <input
            v-model="PostLink"
            class="bg-[#808080]/20 rounded-md border-2 border-white outline-none"
            type="url"
            id="name"
            placeholder="https://google.com"
          />
          <span v-if="error.link" class="text-red-600">{{ error.link }}</span>
        </div>

        <div class="flex justify-between">
          <button
            @click="emit('closeModal')"
            class="bg-[#B9E185] py-[0.5rem] px-[2rem] rounded-md text-white"
            type="submit"
          >
            Cancel
          </button>
          <button class="bg-[#1977A2] py-[0.5rem] px-[2rem] rounded-md text-white" type="submit">
            Create Post
          </button>
        </div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
// const images = ref([])
const imageFile = ref(null)
// const image = ref('')

const PostTitle = ref('')

const PostContent = ref('')

const PostLink = ref('')

// const Post

const onFileChange = (e) => {
  imageFile.value = e.target.files[0]
}


import { ref } from 'vue'
import { usePostStore } from '@/stores/posts'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
// import { CategoriesStore } from '@/stores/categoryStore';

// const categoriesStore = CategoriesStore();

// import { RouterLink } from 'vue-router'

// const authStore = useAuthStore();

const user = JSON.parse(localStorage.getItem('userInfo'))

axios.defaults.baseURL = 'http://127.0.0.2:8000'


const ID = useRoute().params.id

const props = defineProps({
  isOpen: {
    type: Boolean,

    default: false
  }
})

const emit = defineEmits(['closeModal'])

const PostStore = usePostStore()

// const PostTitle = ref('')
// const PostImage = ref('')
// const PostContent = ref('')
const errorMessage = ref('')

const error = ref({ title: '', image: '', content: '', link: '' })

const formError = ref('')

const validatetitle = () => {
  if (!PostTitle.value.trim()) {
    error.value.title = 'Title is required and cannot be blank spaces.'
  } else if (PostTitle.value.length < 3) {
    error.value.title = 'Title must be at least 3 characters.'
  } else {
    error.value.title = ''
  }
}

const validateImage = () => {
  if (imageFile.value == null) {
    error.value.image = 'Image field is required'
  } else {
    error.value.image = ''
  }
}

const validateContent = () => {
  if (!PostContent.value.trim()) {
    error.value.content = 'Content is required and cannot be blank spaces.'
  } else if (PostContent.value.length < 5) {
    error.value.content = 'Content must be at least 5 characters and more than 15.'
  } else {
    error.value.content = ''
  }
}

var regex = /https?:[0-9]*\/\/[\w!?/\+\-_~=;\.,*&@#$%\(\)\'\[\]]+/

const validateLink = () => {
  if (!PostLink.value.trim()) {
    error.value.link = 'Link is required and cannot be blank spaces.'
  } 
  // else if (!regex.test(PostLink)) {
  //   error.value.link = 'The link should loog like this: http://www.google.com'
  // } 
  else {
    error.value.link = ''
  }
}

// const PostUrl = ref('')

const submitForm = async () => {
  validateContent();
  validateImage();
  validateImage();
  validatetitle();
  validateLink();
  if (!error.value.content && !error.value.image && !error.value.link && !error.value.title) {
    
    formError.value = ''
    
    try {
      const config = {
        headers: {
          // mode: 'no-cors',

          'content-type': 'multipart/form-data'
        }
      }
      // try {

      let postElement = new FormData()

      postElement.append('title', PostTitle.value)

      postElement.append('image', imageFile.value)

      postElement.append('content', PostContent.value)

      postElement.append('linked_url', PostLink.value)

      postElement.append('categories_id', ID)

      postElement.append('user_id', user.id)

      await axios
        .post('api/posts', postElement, config)
        .then((res) => {
          console.log('Uploaded:', res.data)
        })
        .catch((err) => console.log(err.response))

      await PostStore.seeposts()

      emit('closeModal')

    } catch (error) {

      formError.value = `Failed to create a post: ${error.message}`

    }
  }
}
</script>

<style scoped>
.create-category {
  max-width: 500px;
  margin: 0 auto;
  padding: 1em;
  background: #f9f9f9;
  border-radius: 5px;
}

h1 {
  font-size: 2em;
  margin-bottom: 1em;
}

div {
  margin-bottom: 1em;
}

label {
  display: block;
  margin-bottom: 0.5em;
  font-weight: bold;
}

input {
  padding: 0.5em;
  width: 100%;
  box-sizing: border-box;
}

.error {
  color: red;
  margin-top: 1em;
}
</style>
