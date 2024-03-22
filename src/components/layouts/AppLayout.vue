<script setup>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../../api'

const router = useRouter()

const loggedIn = ref(localStorage.getItem('loggedIn'))
const name = ref(localStorage.getItem('name'))
const token = ref(localStorage.getItem('token'))

function logout() {
    Api.post(`/api/v1/auth/logout?token=${token.value}`).then(res => {
        console.log(res.data)

        localStorage.clear()

        router.push({ name: 'auth' })
    }).catch(err => console.log(err.response.data))
}

onMounted(() => {
    if(!loggedIn.value) {
        router.push({ name: 'auth' })
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
                        <router-link :to="{ name: 'dashboard' }" class="nav-link">{{ name }}</router-link>
                    </li>
                    <li class="nav-item">
                        <a @click.prevent="logout" class="nav-link" href="javascript:void(0)">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <slot/>

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