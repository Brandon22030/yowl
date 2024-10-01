<template>
  <div class="container">
    <div class="all">
      <div class="sidebar">
        <div class="profile-info">
          <div class="Users"></div>
          <h1>{{ userStore.user.name }}</h1>
        </div>
      </div>
      <div class="sidebar1">
        <div class="stats">
          <h1>Total Posts</h1>

          <div>
            <p>{{ userStore.PostNumber }}</p>
          </div>

          <div>
            <h1>Total Comments</h1>
            <h2>{{ userStore.CommentNumber }}</h2>
          </div>
        </div>
        <div class="menu">
          <div><button @click="showModal1 = true" class="userpro">User Profile</button></div>
          <div><button @click="showModal2 = true" class="userpro1">My Posts</button></div>
          <div><button @click="showModal3 = true" class="userpro2">My Comments</button></div>
          <div><button @click="logout" class="logout-button">Log Out</button></div>
        </div>
      </div>
    </div>
    <!-- Modal1 -->
    <div v-if="showModal1" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>PERSONAL INFORMATION</h2>
        <div class="Avatar">
          <div class="avatar"></div>
          <div class="ava">
            <h3>{{ userStore.user.name }}</h3>
          </div>
        </div>
        <!-- <p>Location{{ user.location }}</p> -->

        <form @submit.prevent="saveUserProfile">
          <div class="form-group">
            <label for="username">User Name</label>
            <input v-if="isEditing" type="text" v-model="formData.name" />
            <h1 v-else>{{ userStore.user.name }}</h1>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input v-if="isEditing" type="email" v-model="formData.email" />
            <h1 v-else>{{ userStore.user.email }}</h1>
          </div>
          <div class="form-actions">
            <div v-if="isEditing">
              <button @click="closeModal, (isEditing = true)" class="save-button">
                Return back
              </button>
              <button
                class="save-button"
                isEditing="false"
                type="submit"
                @click="saveUserProfile()"
              >
                Save
              </button>
            </div>

            <button v-else class="edit-button" @click="toggleEditMode">
              {{ isEditing ? 'Cancel' : 'Edit' }}
            </button>
            <button @click="closeModal" class="cancel-button">Cancel</button>
            <!-- <button class="cancel-button" @click="closeModal">Cancel</button> -->
            <!-- <button class="save-button" type="submit">Save</button> -->
          </div>
        </form>
      </div>
    </div>
    <!--showModal2-->
    <div v-if="showModal2" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>My Posts</h2>
        <div v-for="post in postStore.posts" :key="post.id">
          <div v-if="post.user_id == userStore.user.id">
            <div class="flex items-center my-[2rem]">
              <!-- <p>{{ console.log(post) }}</p> -->

              <img
                class="h-[15rem] bg-cover w-[15rem] my-auto object-cover object-center"
                :src="'http://localhost:8000/storage/' + post.image"
              />
              <div class="compos">
                <h1>{{ post.title }}</h1>
                <!-- <label for="username">User Name</label> -->
                <h3><span>Link :</span> {{ post.linked_url }}</h3>
                <p>{{ post.content }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="avapic">
          <div class="Avatar1"></div>

          <!-- <div class="Author"><h1><span>Author name : </span>{{ userStore.user.name }}</h1></div> -->
        </div>

        <button @click="closeModal" class="cancel-button">Close</button>
      </div>
    </div>

    <!--showModal3-->
    <div v-if="showModal3" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>My Comments</h2>
        <ul>
          <li v-for="comment in commentStore.comments" :key="comment.id">
            <div class="comments" v-if="comment.user_id == userStore.user.id">
              <div class="commentas mb-4">
                <p>
                  <!-- <strong>{{ comment.author }}</strong -->
                  {{ comment.content }}
                </p>
              </div>
            </div>
          </li>
        </ul>
        <button @click="closeModal" class="cancel-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref, onMounted } from 'vue'
import { useUserStore } from '@/stores/UsersDashboardStore'
import { usePostStore } from '@/stores/posts'
import { useCommentairesStore } from '@/stores/comments'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
// import { userInfo } from 'os'
// const userInfo = JSON.parse(localStorage.getItem('userInfo'))
// console.log(userInfo.name)
export default {
  data() {
    return {
      id: this.$route.params.id,
      isEditing: false,
      showModal1: false,
      showModal2: false,
      showModal3: false, // Pour les commentaires
      // postStore: usePostStore(),
      // formData: {
      //   name: '',
      //   email: ''
      // },
      modalUser: {
        name: '',
        email: ''
      },
      router: useRouter(),
      logout: () => {
        this.authStore.logout()

        this.router.push({ name: 'home' })

        console.log('Logging out')
        // Ajoutez ici la logique de déconnexion
      },
      userInfo: JSON.parse(localStorage.getItem('userInfo'))
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    authStore() {
      return useAuthStore()
    },
    postStore() {
      return usePostStore()
    },
    commentStore() {
      return useCommentairesStore()
    },
    formData() {
      return {
        name: this.userStore.user.name,
        email: this.userStore.user.email,
        id: this.userStore.user.id
      }
    },
    fmodalUser() {
      return {
        name: this.userStore.user.name,
        email: this.userStore.user.email
      }
    }
  },

  async mounted() {
    try {
      await this.userStore.fetchUser(this.id)
      await this.postStore.seeposts()
      await this.commentStore.fetchComments()
      await this.userStore.postsByUser(this.id)
      await this.userStore.commentsByUser(this.id)
      this.modalUser = { ...this.userStore.user }
      this.formData = { ...this.modalUser }
    } catch (error) {
      console.error('Error fetching user data:', error)
    }
  },
  methods: {
    toggleEditMode() {
      if (this.isEditing) {
        // this.formData = { ...this.modalUser }
      } else {
        this.formData = { ...this.modalUser }
      }
      this.isEditing = !this.isEditing
    },
    async saveUserProfile() {
      try {
        await this.userStore.updateUser(this.formData)
        this.modalUser = { ...this.formData }
        this.isEditing = false

        await this.userStore.fetchUser(this.id)
      } catch (error) {
        console.error('Failed to save user profile:', error)
      }
    },
    closeModal() {
      this.showModal1 = false
      this.showModal2 = false
      this.showModal3 = false
    },
    async openCommentsModal() {
      this.showModal3 = true
      try {
        await this.commentStore.fetchComments()
      } catch (error) {
        console.error('Failed to fetch comments:', error)
      }
    },
    closeCommentsModal() {
      this.showModal3 = false
    },

    async seeposts() {
      this.showModal2 = true
      try {
        await this.postStore.seeposts()
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      }
    },
    closePostModal() {
      this.showModal2 = false
    }
  }
}
</script>

<style scoped>
.container {
  display: flex;
  max-width: 1900px;
  height: 100vh;
  margin: 0 auto;
  padding: 16px;
  background-color: #23b0f0;
  /* height: 100vh; */
}
.commentas {
  border: black solid;
  border-radius: 5px;
}
.Avatar {
  display: flex;
}

.ava {
  color: #23b0f0;
  font-size: 30px;
  font-weight: bolder;
  margin-top: 25px;
}

.modal-overlay {
  position: fixed;
  top: 15px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: end;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 1120px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
  height: 100%;
}
.modal-content h2 {
  color: #0340e6;
  font-size: 30px;
  font-weight: bolder;
  text-align: center;
}
.all {
  display: block;
  /* gap: 50px; */
}
.sidebar {
  width: 300px;
  background: #f3f5f7;
  padding: 16px;
  margin-right: 16px;
  border-radius: 8px;
  color: black;
  display: flex;
  flex-direction: column;
}

.sidebar1 {
  width: 300px;
  background: #f3f5f7;
  padding: 16px;
  margin-right: 16px;
  border-radius: 8px;
  color: black;
  height: fit-content;
  display: flex;
  flex-direction: column;
  margin-block: 30px;
  gap: 20px;
}

.sidebar h1 {
  color: #23b0f0;
  font-size: 30px;
  text-align: start;
  font-weight: bolder;
  margin-bottom: 20px;
}

.id-info {
  margin-top: 10px;
}

.id-info h2 {
  text-align: start;
  font-size: 20px;
  color: #6b7280;
  font-weight: bold;
}

.id-info h3 {
  text-align: start;
  font-size: 20px;
  font-weight: bolder;
}

.profile-info {
  text-align: center;
  margin-bottom: 16px;
}

/* .allelements {
  display: flex;
  border-bottom: #000 solid;
} */
.compos {
  margin-left: 50px;
  margin-top: 50px;
}
.compos h1 {
  font-weight: bolder;
  font-size: 30px;
}
.compos h3 span {
  text-decoration: underline;
  color: black;
}
.compos h3 {
  color: #23b0f0;
  font-weight: bold;
  margin-top: 20px;
}
.Author {
  margin-left: 350px;
}
.Author span {
  font-weight: bold;
}
.avapic {
  display: flex;
}

/* .Avatar1{ */
/* height: 100px; */
/* width: 100px; */
/* border-radius: 50%; */
/* background-color: #000; */
/* margin-left: 300px; */
/* border: black solid; */
/* marAvagin-top: -25px; */
/* backgAvaround-image:url(/home/romeo/Rendu/C-DEV-160-COT-1-2-yowl-daniel.medehou/Frontend/src/assets/images/logo.svg); */
/* } */
.stats {
  margin-bottom: 16px;
  border-bottom: #000508 solid;
  border-style: double;
  height: 150px;
}
.stats h1 {
  color: #6b7280;
  font-size: 20px;
  font-weight: bold;
}
.stats h2 {
  font-weight: bold;
  color: #0340e6;
}
.stats p {
  color: #000508;
  font-weight: bold;
  margin-bottom: 20px;
}

.menu button {
  /* hover {
    color: #ef4444;
} */
  text-align: start;
  display: block;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background: none;
  margin-bottom: 10px;
  cursor: pointer;
  font-weight: bolder;
  color: #000;
  transition:
    color 0.3s,
    background-color 0.3s;
}
.menu button:hover {
  color: #ef4444; /* Text color on hover */
  background-color: #f3f4f6; /* Optional: change background color on hover */
}
.menu .logout-button {
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  padding: 12px;
}

.profile-card {
  flex: 1;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.logout-button {
  color: #ef4444;
  background: none;
  border: none;
  cursor: pointer;
  font-weight: bolder;
}

.content {
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.avatar {
  width: 96px;
  height: 96px;
  background: #e5e7eb;
  border-radius: 50%;
  background-image: url(/home/romeo/Rendu/C-DEV-160-COT-1-2-yowl-daniel.medehou/Frontend/src/assets/images/3.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

.user-details {
  margin-left: 16px;
}

.user-details h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.user-details p {
  margin: 0;
  color: #6b7280;
}

.info h1 {
  color: #23b0f0;
  font-size: 22px;
  font-weight: bolder;
  /* text-decoration: underline ; */
  /* text-underline-position: below */
}
.form-group {
  margin-bottom: 16px;
}
.form-group h1 {
  color: black;
  font-size: 20px;
  font-weight: normal;
}
.form-group label {
  display: block;
  color: #4b5563;
  margin-bottom: 4px;
  font-weight: bolder;
  font-size: 20px;
  /* text-decoration: underline; */
}
.form-group input {
  height: 50px;
  /* border: black solid; */
  width: 1000px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}

.cancel-button,
.save-button {
  padding: 8px 16px;
  border: white solid 10px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}

.cancel-button {
  background: #10b981;
  margin-right: 8px;
}

.save-button {
  background: #3b82f6;
}
.edit-button {
  background-color: #3b82f6;
  width: 100px;
  border-radius: 4px;
  border: white solid 10px;
}
.modal-content {
  font-size: 20px;
}
</style>
