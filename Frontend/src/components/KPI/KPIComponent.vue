<template>
  <div class="my-2">
    <div class="grid gap-7 mx-auto">
      <div class="p-5 bg-white rounded-[15px] shadow-sm">
        <div class="flex gap-2">
          <div class="">
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="24" height="24" fill="white" />
              <path
                d="M10.3333 10.9829C12.6758 10.9829 14.5747 9.08397 14.5747 6.74147C14.5747 4.39897 12.6758 2.5 10.3333 2.5C7.99077 2.5 6.0918 4.39897 6.0918 6.74147C6.0918 9.08397 7.99077 10.9829 10.3333 10.9829Z"
                stroke="#8AA5B7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.6659 21.5015V18.5352C18.6659 15.7737 16.4273 13.5352 13.6659 13.5352H7C4.23858 13.5352 2 15.7737 2 18.5352V21.5015"
                stroke="#8AA5B7"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M20.333 7V13" stroke="#8AA5B7" stroke-width="1.5" stroke-linecap="round" />
              <path
                d="M17.333 10H23.333"
                stroke="#8AA5B7"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <h1 class="text-[#8AA5B7] text-[16px]">Total comments</h1>
        </div>
        <div class="flex items-center pt-1 mt-1">
          <div class="text-2xl font-bold text-gray-900"> {{ commentaires.comments.length  }} </div>
          <span
            class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>1.8%</span>
          </span>
        </div>
        <div class="flex gap-2 mt-2">
          <div class="mt-1">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18066 4.25391H12.2407V9.31641"
                stroke="#3AB0FF"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2407 4.25391L3.75544 12.7392"
                stroke="#3AB0FF"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="text-[#3AB0FF] text-[14px]">10.2%</p>
        </div>
      </div>
      <!-- <div class="p-5 bg-white rounded-[15px] shadow-sm">
        <h1 class="text-[#8AA5B7] text-[16px]">Posts interactions</h1>
        <div class="flex items-center pt-1">
          <div class="text-2xl font-bold text-gray-900">$7520.50</div>
          <span
            class="flex items-center px-2 py-0.5 mx-2 text-sm text-red-600 bg-red-100 rounded-full"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 9L12 15L18 9"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>2.5%</span>
          </span>
        </div>
      </div> -->
      <div class="p-5 bg-white rounded-[15px] shadow-sm">
        <div class="flex gap-2">
          <div class=" mt-1 ">
            <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.2661 6.71643C22.7771 7.49761 22.7771 8.50551 22.2661 9.28668C21.2909 10.7777 19.9991 12.0436 18.4759 12.9904C16.532 14.1987 14.2888 14.8391 12 14.8391C9.71116 14.8391 7.46797 14.1987 5.52406 12.9904C4.00089 12.0436 2.70908 10.7777 1.73387 9.28668C1.22294 8.50551 1.22294 7.49761 1.73387 6.71643C2.70908 5.22542 4.00089 3.95952 5.52406 3.01274C7.46797 1.80442 9.71116 1.16406 12 1.16406C14.2888 1.16406 16.532 1.80442 18.4759 3.01274C19.9991 3.95952 21.2909 5.22542 22.2661 6.71643Z" stroke="#8AA5B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.0002 11.3031C13.8227 11.3031 15.3002 9.82566 15.3002 8.00312C15.3002 6.18059 13.8227 4.70312 12.0002 4.70312C10.1777 4.70312 8.7002 6.18059 8.7002 8.00312C8.7002 9.82566 10.1777 11.3031 12.0002 11.3031Z" stroke="#8AA5B7" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
          </div>
          <h1 class="text-[#8AA5B7]  text-[16px]">Posts views</h1>
        </div>
        <div class="flex items-center pt-1 mt-1">
          <div class="text-2xl font-bold text-gray-900">{{ PostStore.post.views }}</div>
          <span
            class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>1.8%</span>
          </span>
        </div>
        <div class="flex gap-2 mt-2">
          <div class="mt-1">
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.18066 4.25391H12.2407V9.31641"
                stroke="#3AB0FF"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12.2407 4.25391L3.75544 12.7392"
                stroke="#3AB0FF"
                stroke-width="1.3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <p class="text-[#3AB0FF] text-[14px]">10.2%</p>
        </div>
      </div>
      <!-- <div class="p-5 bg-white rounded-[15px] shadow-sm">
        <h1 class="text-[#8AA5B7] text-[16px]">Posts interactions</h1>
        <div class="flex items-center pt-1">
          <div class="text-2xl font-bold text-gray-900">$250.00</div>
          <span
            class="flex items-center px-2 py-0.5 mx-2 text-sm text-green-600 bg-green-100 rounded-full"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 15L12 9L6 15"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
            <span>2.2%</span>
          </span>
        </div>
      </div> -->
    </div>
  </div>
  <!-- <div class="justify-between items-center mx-auto">
    <div class="bg-white rounded">
      <div class="flex">
        <img src=".../" alt="" class="" />
        <h1 class="text-[#8AA5B7] text-[16px]">Posts interactions</h1>
      </div>
      <p class="text-[#0C2333] text-[24px] ">245.678</p>
      <div class="flex">
        <img src="" alt="" class="" />
        <h1 class="">10,2% than last month</h1>
      </div>
    </div>
    <div class="bg-white rounded">
      <div class="flex">
        <img src="" alt="" class="" />
        <h1 class="">Posts interactions</h1>
      </div>
      <p class="">245.678</p>
      <div class="flex">
        <img src="" alt="" class="" />
        <h1 class="">10,2% than last month</h1>
      </div>
    </div>
    <div class="bg-white rounded">
      <div class="flex">
        <img src="" alt="" class="" />
        <h1 class="">Posts interactions</h1>
      </div>
      <p class="">245.678</p>
      <div class="flex">
        <img src="" alt="" class="" />
        <h1 class="">10,2% than last month</h1>
      </div>
    </div>
  </div> -->
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '@/stores/posts';
import { useCommentairesStore } from '@/stores/comments';
const commentaires =useCommentairesStore();[]
import { useRoute } from 'vue-router'
const ID = useRoute().params.id
const props = {
    key: {
      type: String
    }
  }
const PostStore = usePostStore();

onMounted(() => {
  commentaires.fetchCommentsForPost(ID)
  PostStore.readapost(props.key);
});

</script>