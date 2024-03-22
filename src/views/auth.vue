<script setup>
import Api from '../api'
import { onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loggedIn = ref(localStorage.getItem('loggedIn'))

const id_card_number = ref('')
const password = ref('')
const message = ref('')

function login(){
    let formData = new FormData()

    formData.append('id_card_number', id_card_number.value)
    formData.append('password', password.value)

    Api.post('/api/v1/auth/login', formData).then(res => {
        console.log(res.data)
        localStorage.setItem('loggedIn', true)
        localStorage.setItem('name', res.data.name)
        localStorage.setItem('token', res.data.token)

        router.push({name:'dashboard'})
    }).catch(err => {
        console.log(err.response.data)
        message.value = err.response.data.message
    })

}
onMounted(() => {
    if(!loggedIn.value){
        router.push({name: 'auth'})
    }
})




</script>

<template>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-primary">
        <div class="container">
            <router-link :to="{ name: 'dashboard' }" class="navbar-brand">Job Seekers Platform</router-link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarsExampleDefault">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link :to="{ name: 'auth' }" class="nav-link">Login</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <main>
        <!-- S: Header -->
        <header class="jumbotron">
            <div class="container text-center">
                <h1 class="display-4">Job Seekers Platform</h1>
            </div>
        </header>
        <!-- E: Header -->

        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <form class="card card-default" @submit.prevent="login">
                        <div class="card-header">
                            <h4 class="mb-0">Login</h4>
                        </div>
                        <div class="card-body">
                            <div v-if="message" class="alert alert-danger text-center">
                                {{ message }}
                            </div>
                            <div class="form-group row align-items-center">
                                <div class="col-4 text-right">ID Card Number</div>
                                <div class="col-8"><input v-model="id_card_number" type="text" class="form-control"></div>
                            </div>
                            <div class="form-group row align-items-center">
                                <div class="col-4 text-right">Password</div>
                                <div class="col-8"><input v-model="password" type="password" class="form-control"></div>
                            </div>
                            <div class="form-group row align-items-center mt-4">
                                <div class="col-4"></div>
                                <div class="col-8"><button class="btn btn-primary">Login</button></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </main>

    <!-- S: Footer -->
    <footer>
        <div class="container">
            <div class="text-center py-4 text-muted">
                Copyright &copy; 2023 - Web Tech ID
            </div>
        </div>
    </footer>
    <!-- E: Footer -->
</template>