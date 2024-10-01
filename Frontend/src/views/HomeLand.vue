<template>
    <div>
        <NavBar />
        <AsideBar />
        <!-- <AddPost /> -->
        <MainContent />
      <KPIAllpost />


    </div>
<FooterComponents/>

</template>

<script setup>
import FooterComponents from "@/components/FooterComponents.vue"

import AsideBar from '@/components/Categories Components/AsideBar.vue';
import NavBar from '@/components/NavBar.vue';
import MainContent from '@/components/Categories Components/MainContent.vue';
import KPIAllpost from '@/components/KPI/KPIAllpost.vue'

// import AddPost from '@/components/Posts Components/AddPost.vue';
</script>