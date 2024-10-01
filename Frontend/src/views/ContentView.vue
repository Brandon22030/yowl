<template>
    <div>
        <p v-if="authStore.isAuthenticated">
            {{ console.log(authStore.user) }}!
        </p>
        <button @click="logout">
            Logout
        </button>

        

    </div>
</template>

<script setup>

    import { useAuthStore } from '@/stores/authStore';

    import { onMounted } from 'vue';

    import { useRouter } from 'vue-router';

const router = useRouter()

    const authStore = useAuthStore();

    const logout = () => {

        authStore.logout();

        router.push({ name: 'home' })

    }

    onMounted(() =>{

        if(authStore.isAuthenticated && authStore.user){

            authStore.fetchUser()

        }

    })

</script>

<style lang="scss" scoped>

</style>