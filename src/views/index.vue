<script setup>

import { onMounted, ref } from 'vue'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue'

const token = ref(localStorage.getItem('token'))

const validation = ref([])
const vacancies = ref([])

function getValidation() {
    Api.get(`/api/v1/validations?token=${token.value}`).then(res => {
        console.log(res.data)
        validation.value = res.data.validation
    }).catch(err => console.log(err.response.data))
}

function getVacancies() {
    Api.get(`/api/v1/applications?token=${token.value}`).then(res => {
        console.log(res.data)
        vacancies.value = res.data.vacancies
        
    }).catch(err => 
    console.log(err.data.response))
}

onMounted(() => {
    getValidation()
    getVacancies()
})

</script>

<template>
    <AppLayout>
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Dashboard</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container">

                <!-- S: Data Validation Section -->
                <section class="validation-section mb-5">
                    <div class="section-header mb-3">
                        <h4 class="section-title text-muted">My Data Validation</h4>
                    </div>
                    <div class="row">

                        <!-- S: Link to Request Data Validation -->
                        <div v-if="!validation" class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header">
                                    <h5 class="mb-0">Data Validation</h5>
                                </div>
                                <div class="card-body">
                                    <router-link :to="{ name: 'validations' }" class="btn btn-primary btn-block">+ Request validation</router-link>
                                </div>
                            </div>
                        </div>
                        <!-- E: Link to Request Data Validation -->

                        <!-- S: Society Data Validation Box -->
                        <div v-else class="col-md-4">
                            <div class="card card-default">
                                <div class="card-header border-0">
                                    <h5 class="mb-0">Data Validation</h5>
                                </div>
                                <div class="card-body p-0">
                                    <table class="table table-striped mb-0">
                                        <tr>
                                            <th>Status</th>
                                            <td v-if="validation?.status == 'pending'"><span class="badge badge-info">Pending</span></td>
                                            <td v-if="validation?.status == 'accepted'"><span class="badge badge-success">Accepted</span></td>
                                            <td v-if="validation?.status == 'declined'"><span class="badge badge-danger">Declined</span></td>
                                        </tr>
                                        <tr>
                                            <th>Job Category</th>
                                            <td class="text-muted">{{ validation?.job_category?.job_category || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Job Position</th>
                                            <td class="text-muted">{{ validation?.job_position || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Reason Accepted</th>
                                            <td class="text-muted">{{ validation?.reason_accepted || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Validator</th>
                                            <td class="text-muted">{{ validation?.validator?.name || '-' }}</td>
                                        </tr>
                                        <tr>
                                            <th>Validator Notes</th>
                                            <td class="text-muted">{{ validation?.validator_notes || '-' }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- E: Society Data Validation Box -->

                    </div>
                </section>
                <!-- E: Data Validation Section -->

                <!-- S: List Job Seekers Section -->
                <section class="validation-section mb-5">
                    <div class="section-header mb-3">
                        <div class="row">
                            <div class="col-md-8">
                                <h4 class="section-title text-muted">My Job Applications</h4>
                            </div>
                            <div v-if="validation?.status === 'accepted' && vacancies.length === 0" class="col-md-4">
                            <router-link :to="{ name: 'vacancies' }" class="btn btn-primary btn-lg btn-block">+ Add Job Applications</router-link>
                        </div>

                        </div>
                    </div>
                    <div class="section-body">
                        <div class="row mb-4">

                            <!-- S: Job Applications info -->
                            <div v-if="validation?.status != 'accepted'" class="col-md-12">
                            <!-- <div class="col-md-12"> -->
                                <div class="alert alert-warning">
                                    Your validation must be approved by validator to applying job.
                                </div>
                            </div>
                            <!-- E: Job Applications info -->

                            <!-- S: Job Applications Box -->
                            <div v-else-if="vacancies.length > 0" class="col-md-6">
                        <div class="card card-default" v-for="vacancy in vacancies" :key="vacancy.id">
                            <div class="card-header border-0">
                                <h5 class="mb-0">{{ vacancy.company }}</h5>
                            </div>
                <div class="card-body p-0">
                    <table class="table table-striped mb-0">
                        <tr>
                            <th>Address</th>
                            <td class="text-muted">{{ vacancy.address }}</td>
                        </tr>
                        <!-- You may need to adjust this part according to your data structure -->
                        <tr>
    <th>Position</th>
    <td class="text-muted">
        <ul>
            <li v-for="position in vacancy.available_position" :key="position.id">
                {{ position.position }}   <span class="badge badge-success">Success</span>
            </li>
        </ul>
    </td>
</tr>

                        <tr>
                            <th>Apply Date</th>
                            <td class="text-muted">{{ vacancy.date }}</td>
                        </tr>
                        
                        <tr>
                            <th>Notes</th>
                            <td class="text-muted">{{ vacancy.notes }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>

                            <!-- S: Job Applications Box -->
                        </div>

                    </div>
                </section>
                <!-- E: List Job Seekers Section -->

            </div>

        </main>
    </AppLayout>
</template>