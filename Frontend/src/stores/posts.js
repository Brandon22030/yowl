import router from '@/router'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('topic', {
  state: () => ({
    // return {
    posts: [],
    post: '',
    PostsByCategory: [],
    postCount: '',
    total: null,
    url: 'http://127.0.0.2:8000/api'


    // }
  }),

  actions: {
    //fetch and display all the posts
    async seeposts() {
      const resp = await fetch(`${this.url}/posts`)

      const data = await resp.json()

      this.posts = await data

      this.total = this.posts.length

      // console.log(this.total)

      // console.log(this.posts)

    },
    // FETCH POST BY CATEGORY
    // async fetchPostsByCategories(categoryId) {

    //     // try{

    //         const response = await fetch(`${this.url}/categories/${categoryId}/posts`);

    //         const data = await response.json();

    //         this.posts = await data;

    //         console.log(this.posts)

    //     // } catch(error){

    //     //     console.error('Error fetching posts by categorie:', error);

    //     // }

    // },

    async readapost(id) {
      const rqoptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      }
      const response = await fetch(`http://127.0.0.2:8000/api/posts/` + id, rqoptions)

      const data = await response.json()

      this.post = await data;
      
      console.log(data);
      console.log(this.post);

    },
    
    async countPostComment(id){
      const response = await fetch(`http://localhost:8000/api/posts/${id}/comments`)
      
      const data = await response.json()

      this.post = await data;
      console.log(data.length)

    },

    //update an existing post
    async updateapost(postId, ntitle, nimage, ncontent, nlink, categoryId, userId) {

      await fetch(`${this.url}/posts/${postId}`, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          id: postId,
          title: ntitle,
          image: nimage,
          content: ncontent,
          linked_url: nlink,
          categories_id: categoryId,
          user_id: userId
        })
      })
    },
    //delete an existing post
    async deleteapost(id) {
      const rqoptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }
      await fetch(`${this.url}/posts/${id}`, rqoptions)
        .then(() => {
          this.status = 'Delete successful'
        })
        .then(() => {
          this.seeposts()
        })
    }
  }
})