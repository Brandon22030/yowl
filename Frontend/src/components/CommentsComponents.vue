<script setup>
import KPIComponent from './KPI/KPIComponent.vue'
import { useCommentairesStore } from '../stores/comments.js'
import { usePostStore } from '@/stores/posts'

import { userStore } from '@/stores/userStore'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const ID = useRoute().params.id
const PostStore = usePostStore()
const newComment = ref('')
const commentaires = useCommentairesStore()
const user = userStore()
const repContent = ref('')
const repToCommentId = ref(null)
const userInfo = JSON.parse(localStorage.getItem('userInfo'))

onMounted(async () => {
  await commentaires.fetchCommentsForPost(ID)
  // PostStore.countPostComment(ID)
  await PostStore.readapost(ID)

  await user.fetchAllUsers()

  await user.fetchOneUser(ID)
}) 

// long.value = commentaires.fetchCommentsForPost(ID)



// const addComment = async () => {
//   if (newComment.value.trim() === '') return
//   commentaires.createComments(newComment.value, userInfo.id, ID)
//   newComment.value = ''

//   await commentaires.fetchCommentsForPost(ID)
// }

const addComment = async (parentId = null) => {
  if ((parentId === null && newComment.value.trim() === '') ||
      (parentId !== null && repContent.value.trim() === '')) return

  await commentaires.createComments(parentId === null ? newComment.value : repContent.value, userInfo.id, ID, parentId)

  newComment.value = ''
  repContent.value = ''
  repToCommentId.value = null

  await commentaires.fetchCommentsForPost(ID)
}

const showReplyForm = (commentId) => {
  repToCommentId.value = commentId
}

const src = 'http://127.0.0.2:8000/storage/'


const editComment = async (id, content) => {
  const updatedContent = prompt('Edit comment:', content)
  if (updatedContent !== null && updatedContent.trim() !== '') {
    await commentaires.updateComment(id, updatedContent)
    await commentaires.fetchCommentsForPost(ID);

  }
}

const removeComment = async (id) => {
  if (confirm('Are you sure you want to delete this comment?')) {
    await commentaires.deleteComment(id)
  }
}
</script>

<template>
  <div ></div>

  <div class="sm:flex  justify-end pr-10">
    <div class="p-2 container md:max-w-3xl">
      <div
        v-if="PostStore.post"
        class="bg-white sm:max-w-[666px] md:max-w-3xl p-4 mx-auto rounded-[16px] border grid md:grid-cols-2"
      >
        <div class="sm:w-[200px]">
          <img
            :src="src + PostStore.post.image"
            class="h-[15rem] bg-cover w-[15rem] my-auto object-cover object-center"
            alt="no image"
          />
          <div class="ml-5 mt-5">
            <h2 class="text-[14px]">Posted By</h2>
            <div class="flex gap-2 mt-5 items-center">
              <div class="">
                <img src="../assets/images/Ellipse 2.png" alt="" class="w-42 h-42" />
              </div>
              <div class="">
                <h3 class="text-[1rem]">{{ user.user.name }}</h3>
                <!-- <p>12 minute ago</p> -->
              </div>
            </div>
            <div class="flex mt-5 gap-2 ml-2 my-center">
              <button>
                <img src="../assets/images/icon.png" alt="" class="w-[28px] h-[28px]" />
              </button>
              <p class="text-[12px] my-auto">152 Likes</p>
            </div>
          </div>
        </div>
        <div class="sm:ml-[-90px] md:ml-[-150px]">
          <h1 class="text-[#364045] text-[20px] w-[380px]">
            {{ PostStore.post.title }}
          </h1>
          <div class="flex my-4">
            <h2 class="font-bold text-[#48555C] text-[15px]">
              Link : <a :href="PostStore.post.linked_url" class="text-blue-800 underline">View ressource</a>
            </h2>
          </div>
          <p class="my-2 w-[420px] text-[#48555C] text-[12px] text-left">
            {{ PostStore.post.content }}
          </p>
        </div>
        <div class="mt-10 ml-10 sm:w-[626px]">
          <div class="mt-2 ml-2 my-center">
            <input
              v-model="newComment"
              class="border text-[#48555C] rounded-[16px] border-[#48555B] h-[50px] md:w-[626px] sm:w-[560px] p-4 md:placeholder-[12px]"
              type="text"
              name=""
              placeholder="Add comment.."
            />
            <button
              @click="addComment()"
              class="mt-4 rounded-[10px] font-bold w-[160px] h-[51px] bg-[#1977A2] hover:bg-blue-600 text-white"
              type="submit"
            >
              Add comment
            </button>
          </div>

          <ul>
            <li v-for="comment in commentaires.comments" :key="comment.id">
              <div v-if="$route.params.id == comment.posts_id">
                <div class="flex gap-2 mt-5">
                  <div class="">
                    <img src="../assets/images/Ellipse 2.png" alt="" class="w-42 h-42" />
                  </div>
                  <div class="my-auto" v-for="user in user.users" :key="user.id">
                    <h3 class="text-[12px] text-[#48555B] font-black" v-if="comment.user_id == user.id">{{ user.name }}</h3>
                  </div>
                </div>
                <div
                  class="border ml-2 p-4 md:w-full sm:w-[560px] border-[#48555B] rounded-[16px] mt-2 text-[12px]"
                >
                  <p class="text-[#48555C] text-[12px]">
                    {{ comment.content }}
                  </p>
                </div>

                <div class="flex mt-2 gap-2 ml-2 my-center md:justify-end md:items-end">
                  <button @click="showReplyForm(comment.id)">Reply</button>
                  <button @click="editComment(comment.id, comment.content)">Edit</button>
                  <button @click="removeComment(comment.id)">Delete</button>
                </div>

                <!-- <div v-if="repToCommentId === comment.id">
                  <input
                    v-model="repContent"
                    placeholder="Add reply..."
                  />
                  <button @click="addComment(repToCommentId)">Add Reply</button>
                </div>
        
                <ul v-if="comment.replies && comment.replies.length">
                  <li v-for="reply in comment.replies" :key="reply.id">
                    <p>{{ reply.content }}</p>
                  </li>
                </ul>
              -->

                <div v-if="repToCommentId === comment.id">
                  <input
                    v-model="repContent"
                    class="border text-[#48555C] rounded-[16px] border-[#48555B] h-[50px] w-[626px] p-4 placeholder-[12px]"
                    type="text"
                    placeholder="Add reply.."
                  />
                  <button
                    @click="addComment(repToCommentId.value)"
                    class="mt-4 rounded-[10px] font-bold w-[160px] h-[51px] bg-[#1977A2] hover:bg-blue-600 text-white"
                    type="submit"
                  >
                    Add reply
                  </button>
                </div>

                <ul v-if="comment.replies && comment.replies.length">
                  <li v-for="reply in comment.replies" :key="reply.id">
                    <div class="border p-4 w-full border-[#48555B] rounded-[16px] mt-2 text-[12px]">
                      <p class="text-[#48555C] text-[12px]">{{ reply.content }}</p>
                    </div>
                  </li>
                </ul>
                <div
                  class="flex mt-2 gap-2 ml-2 my-center sm:mr-[100px] md:mr-0 justify-end items-end"
                >
                  <button>
                    <img src="../assets/images/icon.png" alt="" class="w-[28px] h-[28px]" />
                  </button>
                  <p class="text-[12px] text-[#48555C] my-auto">152 Likes</p>
                  <p class="text-[#48555C] my-auto text-[12px]">{{comment.minutes}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <KPIComponent :key="ID" ></KPIComponent>
  </div>
</template>