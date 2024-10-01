<template>
    <div id="app">
      <UsersDashboard />
      <DashUsersProfile />
    </div>
  </template>
  
  <script>
  import DashUsersProfile from '@/components/DashUsersProfile.vue';
import UsersDashboard from '@/components/UsersDashboard.vue';
  export default {
    components: {
      UsersDashboard,
      DashUsersProfile
    }
  }
 