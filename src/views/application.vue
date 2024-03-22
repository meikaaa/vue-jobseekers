<script setup>

import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue'

const route = useRoute()
const router = useRouter()
const token = ref(localStorage.getItem('token'))

const vacancy = ref([])
const positions = ref([])
const notes = ref('')

function getJobVacancy() {
    Api.get(`/api/v1/job_vacancies/${route.params.id}?token=${token.value}`).then(res => {
        console.log(res.data)

        vacancy.value = res.data.vacancy
    }).catch(err => console.log(err.response.data))
}

function store() {
    let formData = new FormData()

    formData.append('vacancy_id', route.params.id)
    formData.append('positions', positions.value)
    formData.append('notes', notes.value)

    Api.post(`/api/v1/applications?token=${token.value}`, formData).then(res=>{
        console.log(res.data)
        router.push({name:'dashboard'})
    }).catch(err=> {
        router.push({name:'dashboard'})
    })
}

onMounted(() => {
    getJobVacancy()
})

</script>

<template>
    <AppLayout>
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container text-center">
                    <div>
                        <h1 class="display-4">{{ vacancy.company }}</h1>
                        <span class="text-muted">{{ vacancy.address }}</span>
                    </div>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container">

                <div class="row mb-3">
                    <div class="col-md-12">
                        <div class="form-group">
                            <h3>Description</h3>
                            {{ vacancy.description }}
                        </div>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-12">
                        <form @submit.prevent="store" class="form-group">
                            <h3>Select position</h3>
                            <table class="table table-bordered table-hover table-striped">
                                    <tr>
                                        <th width="1">#</th>
                                        <th>Position</th>
                                        <th>Capacity</th>
                                        <th>Application / Max</th>
                                        <th rowspan="4" style="vertical-align: middle; white-space: nowrap;" width="1">
                                            <input type="submit" value="Apply for this job" class="btn btn-primary btn-lg">
                                        </th>
                                    </tr>
                                    <tr v-for="(position, index) in vacancy.available_position" :key="index">    
                                        <td><input type="checkbox" name="positions" v-model="positions"></td>
                                        <td>{{ position.position }}</td>
                                        <td>{{ position.capacity }}</td>
                                        <td>{{ position.apply_count + '/' + position.apply_capacity }}</td>
                                    </tr>
                            </table>
                        </form>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group">
                            <div class="d-flex align-items-center mb-3">
                                <label class="mr-3 mb-0">Notes for Company</label>
                            </div>
                            <textarea v-model="notes" class="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                        </div>
                    </div>
                </div>

            </div>

        </main>
    </AppLayout>
</template>