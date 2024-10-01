import { ref } from 'vue'

import { defineStore } from 'pinia'

export const PostStore = ref({
  post: null,

  comments: [],
  async fetchPost(postId) {
    const response = await fetch(`${this.url}/posts/${postId}`)

    this.post = await response.json()
  },

  async fetchCommentsForPost(postId) {
    const response = await fetch(`${this.url}/comments?post=${postId}`)

    this.comments = await response.json()
  }
})

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],

    user: '',

    userPost: [],

    userComment: [],

    CommentNumber: null,

    PostNumber: null,

    url: 'http://127.0.0.2:8000/api'
  }),

  actions: {
    // SHOW USER BY ID
    async fetchUser(userId) {
      try {
        const response = await fetch(`${this.url}/users/${userId}`)

        const data = await response.json()

        this.user = await data

        console.log(this.user)
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },

    async postsByUser(userId) {
      try {
        const response = await fetch(`${this.url}/users/${userId}/posts`)

        const data = await response.json()

        this.userPost = await data

        this.PostNumber = this.userPost.length

        console.log(this.PostNumber)
      } catch (error) {
        console.error('Login error:', error)
      }
    },

    async commentsByUser(userId) {
      try {
        const response = await fetch(`${this.url}/users/${userId}/comments`)

        const data = await response.json()

        this.userComment = await data

        this.CommentNumber = this.userComment.length

        console.log(this.CommentNumber)
      } catch (error) {
        console.error('Login error:', error)
      }
    },

    async updateUser(userData) {
      try {
        const response = await fetch(`${this.url}/users/${userData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })
        if (!response.ok) {
          throw new Error('Error updating user')
        }
        const data = await response.json()
        this.user = data
      } catch (error) {
        console.error('Error updating user:', error)
      }
    },

    async fetchCommentsForPost(postId) {
      const response = await fetch(`${this.url}/comments?post=${postId}`)
      this.comments = await response.json()
    },
    async deleteUser(userId) {
      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: 'DELETE'
        })
        if (!response.ok) {
          throw new Error('Error deleting user')
        }
        this.user = null
      } catch (error) {
        console.error('Error deleting user:', error)
      }
    }
  },
  getters: {
    getUser: (state) => state.user
  }
})
