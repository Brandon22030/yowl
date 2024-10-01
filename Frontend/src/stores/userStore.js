import { defineStore } from "pinia";

export const userStore = defineStore('userStore', {

    state: () => ({
    
        users: [],

        user: '',

        url: 'http://127.0.0.2:8000/api'

    }),

    actions: {

        // DISPLAY ALL USERS
        async fetchAllUsers(){

            try{

                const response = await fetch(`${this.url}/users`);

                const data = await response.json();

                this.users = await data;

                console.log(this.users)

            } catch(error){

                console.error('Login error:', error);

            }
            
        },


        // DISPLAY ONE USER
        async fetchOneUser(userId){

            try{

                const response = await fetch(`${this.url}/users/${userId}`);

                const data = await response.json();

                this.user = await data;

                console.log(this.user)

            } catch(error){

                console.error('Login error:', error);

            }

        },



    }

})