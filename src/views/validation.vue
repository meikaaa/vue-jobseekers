<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Api from '../api'
import AppLayout from '../components/layouts/AppLayout.vue'

const router = useRouter()
const token = ref(localStorage.getItem('token'))

const job_category = ref(1)
const job_position = ref('')
const have_work_experience = ref('yes')
const work_experience = ref('')
const reason_accepted = ref('')

function store() {
    let formData = new FormData()

    formData.append('work_experience', work_experience.value)
    formData.append('job_category_id', job_category.value)
    formData.append('job_position', job_position.value)
    formData.append('reason_accepted', reason_accepted.value)

    Api.post(`/api/v1/validations?token=${token.value}`, formData).then(res => {
        console.log(res.data)

        router.push({ name: 'dashboard' })
    }).catch(err => console.log(err.response.data))
}

</script>

<template>
    <AppLayout>
        <main>
            <!-- S: Header -->
            <header class="jumbotron">
                <div class="container">
                    <h1 class="display-4">Request Data Validation</h1>
                </div>
            </header>
            <!-- E: Header -->

            <div class="container">

                <form @submit.prevent="store">
                    <div class="row mb-4">
                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Job Category</label>
                                    <select class="form-control-sm" v-model="job_category">
                                        <option value="1">Computing and ICT</option>
                                        <option value="2">Construction and building</option>
                                        <option value="3">Animals, land and environment</option>
                                        <option value="4">Design, arts and crafts</option>
                                        <option value="5">Education and training</option>
                                    </select>
                                </div>
                                <textarea v-model="job_position" class="form-control" cols="30" rows="5" placeholder="Job position sparate with , (comma)"></textarea>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Work Experiences ?</label>
                                    <select class="form-control-sm" v-model="have_work_experience">
                                        <option value="yes">Yes, I have</option>
                                        <option value="no">No</option>
                                    </select>
                                </div>
                                <textarea v-if="have_work_experience == 'yes'" v-model="work_experience" class="form-control" cols="30" rows="5" placeholder="Describe your work experiences"></textarea>
                            </div>
                        </div>
                        
                        <div class="col-md-12">
                            <div class="form-group">
                                <div class="d-flex align-items-center mb-3">
                                    <label class="mr-3 mb-0">Reason Accepted</label>
                                </div>
                                <textarea v-model="reason_accepted" class="form-control" cols="30" rows="6" placeholder="Explain why you should be accepted"></textarea>
                            </div>
                        </div>
                    </div>

                    <button class="btn btn-primary">Send Request</button>
                </form>

            </div>

        </main>
    </AppLayout>
</template>