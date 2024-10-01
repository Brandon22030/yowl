<template>
  <div
    @click="emit('closeModal')"
    :show="isOpen"
    class="fixed top-0 bottom-0 left-0 right-0 z-50 bg-[#00000085] h-full flex justify-center items-center"
  >
    <div
      @click.stop
      class="box-content shadow-md rounded-xl bg-white w-[50%] mx-auto mt-[5rem] items-center p-[3rem]"
    >
      <div @click="emit('closeModal')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6 cursor-pointer"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 class="text-center font-bold">ADD A CATEGORY</h1>
      <form @submit.prevent="submitForm()" enctype="multipart/form-data">
        <div>
          <label for="name">Category Name</label>
          <input
            v-model="categoryName"
            class="bg-[#808080]/20 rounded-md border-2 border-white outline-none"
            type="text"
            id="name"
            placeholder="Category name..."
            required
          />
          <span v-if="error.name" class="text-red-600">{{ error.name }}</span>
        </div>

        <div>
          <label for="image">Category Image URL:</label>

          <input type="file" name="image" @change="onFileChange($event)" />
          <span v-if="error.image" class="text-red-600">{{ error.image }}</span>
        </div>

        <button class="bg-[#1977A2] py-[0.5rem] px-[2rem] rounded-md text-white" type="submit">
          Add Category
        </button>
        <div v-if="formError">{{ formError }}</div>
      </form>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CategoriesStore } from '@/stores/categoryStore'
import axios from 'axios'
// import { RouterLink } from 'vue-router'

const props = defineProps({
  isOpen: {
    type: Boolean,

    default: false
  }
})

const emit = defineEmits(['closeModal'])
const images = ref([])
const imageFile = ref(null)
const image = ref(null)

const categoriesStore = CategoriesStore()

const categoryName = ref('')
const errorMessage = ref('')

const onFileChange = (e) => {
  image.value = e.target.files[0]
}

const error = ref({ name: '', image: '' })

const formError = ref('')

const validateName = () => {
  if (!categoryName.value.trim()) {
    error.value.name = 'Name is required and cannot be blank spaces.'
  } else if (categoryName.value.length < 3 || categoryName.value.length > 15) {
    error.value.name = 'Name must be at least 3 characters and more than 15.'
  } else {
    error.value.name = ''
  }
}

const validateImage = () => {
  // if (!image.value.trim()) {
  //   error.value.image = 'image is required and cannot be blank spaces.'
  // }
  if (image.value == null) {
    error.value.image = 'Image field is required'
  } else {
    error.value.image = ''
  }
}

const userInfo = JSON.parse(localStorage.getItem('userInfo'))


axios.defaults.baseURL = 'http://127.0.0.2:8000'

const submitForm = async () => {
  validateName()
  validateImage()

  if (!error.value.name) {
    formError.value = ''

    try {
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }

      let data = new FormData()

      data.append('name', categoryName.value)

      data.append('image', image.value)

      data.append('user_id', userInfo.id)

      await axios
        .post('api/categories', data, config)

        .then((res) => {
          console.log('Uploaded:', res.data)
        })
        .catch((err) => console.log(err.response))

      await categoriesStore.fetchCategories()

      emit('closeModal')
    } catch (error) {
      formError.value = `Failed to create Category: ${error.message}`
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
  font-size: 1.5em;
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
