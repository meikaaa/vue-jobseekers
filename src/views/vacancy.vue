<script setup>

import { onMounted, ref } from 'vue'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue'

const token = ref(localStorage.getItem('token'))

const vacancies = ref([])

function getJobVacancies() {
    Api.get(`/api/v1/job_vacancies?token=${token.value}`).then(res => {
        console.log(res.data)

        vacancies.value = res.data.vacancies
    }).catch(err => console.log(err.response.data))
}

onMounted(() => {
    getJobVacancies()
})

</script>

<template>
    <AppLayout>
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Job Vacancies</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container mb-5">

                <div class="section-header mb-4">
                    <h4 class="section-title text-muted font-weight-normal">List of Job Vacancies</h4>
                </div>

                <div class="section-body">

                    <article v-for="(vacancy, index) in vacancies" :key="index" class="spot">
                        <div class="row">
                            <div class="col-5">
                                <h5 class="text-primary">{{ vacancy.company }}</h5>
                                <span class="text-muted">{{ vacancy.address }}</span>
                            </div>
                            <div class="col-4">
                                <h5>Available Position (Capacity)</h5>
                                <span v-for="(position, index) in vacancy.available_position" :key="index" class="text-muted">{{ position.position + ' (' + position.capacity + ')' }}</span>
                            </div>
                            <div class="col-3">
                                <router-link :to="{ name: 'applications', params: { id: vacancy.id } }" class="btn btn-danger btn-lg btn-block">Detail / Apply</router-link>
                            </div>
                        </div>
                    </article>

                </div>

            </div>

        </main>
    </AppLayout>
</template>