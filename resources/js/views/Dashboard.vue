<template>
  <page-component title="Dashboard">
    <loading-component v-if="dashboard.loading"></loading-component>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700">
      <div
        class="bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2 animate-fade-in-down"
        style="animation-delay: 0.1s"
      >
        <h3 class="text-2xl font-semibold">Total Surveys</h3>
        <div
          class="text-8xl font-semibold flex-1 flex items-center justify-center"
        >
          {{ dashboard.data.totalSurveys }}
        </div>
      </div>
      <div
        class="bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4 animate-fade-in-down"
        style="animation-delay: 0.2s"
      >
        <h3 class="text-2xl font-semibold">Total Answers</h3>
        <div
          class="text-8xl font-semibold flex-1 flex items-center justify-center"
        >
          {{ dashboard.data.totalAnswers }}
        </div>

      </div>
      <div
        class="row-span-2 bg-white shadow-md p-3 order-3 lg:order-1 animate-fade-in-down"
      >
        <h3 class="text-2xl font-semibold">Latest Survey</h3>
        <img
          :src="dashboard.data.latestSurvey.image_url"
          :alt="dashboard.data.latestSurvey.title"
          class="w-[15rem] mx-auto p-4"
        />
        <h2 class="text-xl font-bold mb-3">{{ dashboard.data.latestSurvey.title }}</h2>
        <div class="flex justify-between text-sm mb-1">
          <div>Create date:</div>
          <div>{{ dashboard.data.latestSurvey.created_at }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Expire date:</div>
          <div>{{ dashboard.data.latestSurvey.expire_date }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Status:</div>
          <div>{{ dashboard.data.latestSurvey.status ? 'Active' : 'Draft' }}</div>
        </div>
        <div class="flex justify-between text-sm mb-1">
          <div>Questions:</div>
          <div>{{ dashboard.data.latestSurvey.questions_count }}</div>
        </div>
        <div class="flex justify-between text-sm mb-3">
          <div>Answers:</div>
          <div>{{ dashboard.data.latestSurvey.answers_count }}</div>
        </div>
        <div class="flex justify-between">
          <router-link
            :to="{ name: 'SurveyView', params: { id: dashboard.data.latestSurvey.id } }"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PencilIcon class="h-5 w-5 mr-2" />
            Edit Survey
          </router-link>
          <button
            type="button"
            class="flex py-2 px-4 border border-transparent text-sm rounded-md text-indigo-500 hover:bg-indigo-700 hover:text-white transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <EyeIcon class="h-5 w-5 mr-2" />
            View Answers
          </button>
        </div>
      </div>
      <div
        class="row-span-2 bg-white shadow-md p-3 order-4 lg:order-3 animate-fade-in-down"
        style="animation-delay: 0.3s"
      >
        <div class="flex justify-between items-center mb-3 px-2">
          <h3 class="text-2xl font-semibold">Latest Answers</h3>

          <a
            href="javascript:void(0)"
            class="text-sm text-blue-500 hover:decoration-blue-500"
          >
            View all
          </a>
        </div>
        <a
          v-for="answer of dashboard.data.latestAnswers"
          :key="answer.id"
          href="#"
          class="block p-2 hover:bg-gray-100/90"
        >
          <div class="font-semibold">{{ answer.survey.title }}</div>
          <small>
            Answer Made at:
            <i class="font-semibold">{{ answer.end_date }}</i>
          </small>
        </a>
      </div>
    </div>
  </page-component>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { PencilIcon, EyeIcon } from '@heroicons/vue/outline'
import { PageComponent } from '@/components/base';
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const { dashboard } = storeToRefs(mainStore)

mainStore.getDashboardData()
</script>
