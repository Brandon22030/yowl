import { defineStore } from 'pinia'

export const CategoriesStore = defineStore('categories', {
  state: () => ({
    categories: [],

    category: '',

    selectedCategory: null,

  posts: [],
  

  allPosts:[],

    url: 'http://127.0.0.2:8000/api'
  }),

  actions: {
    // SHOW ALL CATEGORIES
    async fetchCategories() {
      // try{

      const response = await fetch(`${this.url}/categories`)

      const data = await response.json()

      this.categories = await data

    },

    // SELECTED CATEGORY
    selectCategory(categoryId) {
      
      this.selectedCategory = categoryId

      // return this.selectedCategory
    },

    // POSTS BY CATEGORIES
    async selectCategoryById(categoryId){

      return await fetch(`${this.url}/categories/${categoryId}/posts`)

      .then( response => response.json())

      .then(posts => {return posts.length});

    },

    //     try{

    //         const response = await fetch(`${this.url}/categories`);

    //         const data = await response.json();

    //         const categoriesWithPosts = await Promise.all(

    //             data.map(async(category) =>{

    //                 const postsResponse = await fetch(`${this.url}/posts?categories=${category.id}`);

    //                 const postsData = await postsResponse.json();

    //                 category.posts = postsData;

    //                 return category;

    //             })

    //         );

    //         this.categories = categoriesWithPosts;

    //     } catch(error){

    //         console.error('Error fetching categories or posts:', error);

    //     }

    // },

    // SHOW CATEGORY BY ID
    async fetchCategory(categoryId) {
      try {
        const response = await fetch(`${this.url}/categories/${categoryId}`)

        const data = await response.json()

        this.category = await data

        // this.

        console.log(this.category)
      } catch (error) {
        console.error('Error fetching category:', error)
      }
    },

    // ADD CATEGORY
    async addCategory(categoryName, categoryImage, userId) {
      try {
        let data = new FormData()

        data.append('name', categoryName)

        data.append('image', categoryImage)

        data.append('user_id', userId)

        console.log(data.get('image'))
        console.log(data.get('name'))

        await fetch(`${this.url}/categories`, {
        
            method: 'POST',

            headers: {
            
                'content-type': 'multipart/form-data'
            
            },

            body: JSON.stringify(data)

        })

        // const newCategory = await response.json();

        // newCategory.posts = [];

        // this.categories.unshift(newCategory);
      } catch (error) {

        console.error('Error creating category:', error)
        
      }
    },

    // UPDATE CATEGORY
    async updateCategory(categoryId, categoryName, categoryImage, userId) {
      try {
        await fetch(`${this.url}/categories/${categoryId}`, {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            id: categoryId,

            name: categoryName,

            image: categoryImage,

            user_id: userId
          })
        })

        this.categories = this.categories.find((cat) => cat.id === categoryId)
      } catch (error) {
        console.error('Error updating post:', error)
      }

      await this.fetchCategories()
    },

    // DELETE CATEGORY
    async deleteCategory(categoryId) {
      try {
        await fetch(`${this.url}/categories/${categoryId}`, {
          method: 'DELETE'
        })

        this.categories = this.categories.filter((cat) => cat.id === categoryId)
      } catch (error) {
        console.error('Error deleting post:', error)
      }

      await this.fetchCategories()
    }
  }
})
