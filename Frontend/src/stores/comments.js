// import { ref, computed } from 'vue'

import { defineStore } from 'pinia'

export const useCommentairesStore = defineStore('commentaires', {
  state: () => ({
    posts: [],
    comments: [],
    total: [],
    minutes:'',
    url: 'http://127.0.0.2:8000/api'
  }),
  actions: {
    async fetchComments() {
      const response = await fetch(`${this.url}/comments`)
      this.comments = await response.json()

      console.log(this.comments)

    },



    async fetchCommentsForPost(postId) {
      const response = await fetch(`${this.url}/posts/${postId}/comments`)
      const data = await response.json()
      this.comments = await data
      // this.minutes= await this.comments.minutes
      // console.log(this.minutes)

      // this.total = await response.json()
      // return this.comments.length

    },

    
    async createComments(newComment, userId, post_id,parent_id = null) {
      const response = await fetch(`${this.url}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newComment, user_id: userId, posts_id: post_id,parent_id })
      })
      const createdComment = await response.json()
      if (parent_id === null) {
        this.comments.unshift(createdComment.comment)
        this.minutes= await createdComment.minutes
        console.log(this.minutes)
      } else {
        const parentComment = this.comments.find(comment => comment.id === parent_id)
        if (parentComment) {
          parentComment.comments.unshift(createdComment)
        }
      }
    },

    
    async updateComment(id, content) {
      try {
        const response = await fetch(`${this.url}/comments/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });
        if (!response.ok) throw new Error('Failed to update comment');
        const updatedComment = await response.json();
        const index = this.comments.findIndex(comment => comment.id === id);
        if (index !== -1) {
          this.comments[index] = updatedComment;
        }
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },
    
    async deleteComment(id) {
      try {
        const response = await fetch(`${this.url}/comments/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete comment');
        this.comments = this.comments.filter(comment => comment.id !== id);
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    },
  },
  getters: {
    getComments() {
      return this.comments
    }
  }
})


// async createComments(newComment, userId, post_id, parent_id = null) {
//   const response = await fetch(`${this.url}/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ content: newComment, user_id: userId, posts_id: post_id, parent_id })
//   })
//   const createdComment = await response.json()

//   if (parent_id === null) {
//     this.comments.unshift(createdComment) // Ajoute un commentaire principal
//   } else {
//     const parentComment = this.comments.find(comment => comment.id === parent_id)
//     if (parentComment) {
//       parentComment.replies = parentComment.replies || []
//       parentComment.replies.unshift(createdComment) // Ajoute une réponse
//     }
//   }
// }
