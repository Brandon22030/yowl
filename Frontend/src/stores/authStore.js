
import { defineStore } from "pinia";
// import router from "@/router";

export const useAuthStore = defineStore('authStore', {

    state: () => ({

        token: localStorage.getItem('authToken') || '',

        user: localStorage.getItem('userInfo') || '',

        userInfo: [],

        url: "http://127.0.0.2:8000/api"

    }),

    getters: {

        isAuthenticated: (state) => !!state.token

    },

    actions: {

        async register(name, email, birthdate, password) {

            try{

                const response = await fetch(`${this.url}/register`, {

                    method: 'POST',

                    headers: {

                        'Content-Type' : 'application/json',

                    },

                    body:JSON.stringify({name, email, birthdate, password}),

                });

                if(!response.ok){

                    throw new Error('Failed to login');

                }

                return true;


            } catch(error){

                console.error('Login error:', error);

                return false;

            }


        },
    
        // LOGIN FUNCTION
        async login(email, password){

            try{

                const response = await fetch(`${this.url}/login`, {

                    method: 'POST',

                    headers: {

                        'Content-Type' : 'application/json',

                    },

                    body:JSON.stringify({email, password}),

                });

                if(!response.ok){

                    throw new Error('Failed to login');

                }

                const data = await response.json();

                this.token = data.token;

                this.user = JSON.stringify(data.user);

                localStorage.setItem('userInfo', this.user);

                localStorage.setItem('authToken', this.token);

                return true;

            } catch(error){

                console.error('Login error:', error);

                return false;

            } 

        },

        // LOGOUT FUNCTION
        async logout() {

            await fetch(`${this.url}/logout`, {

                method: 'POST',

                headers: {

                    'Content-Type' : 'application/json',

                    'Authorization' : `Bearer ${this.token}`

                },

            });

            localStorage.removeItem('authToken')

        },

    }

})