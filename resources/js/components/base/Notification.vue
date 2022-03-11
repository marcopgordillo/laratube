<template>
  <div
    v-if="notification.show"
    class="fixed w-[18rem] left-4 bottom-4 py-2 px-4 text-white animate-fade-in-down"
    :class="classNotification"
  >
    {{ notification.message }}
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useSurveyStore } from '@/store'

const surveyStore = useSurveyStore()

const { notification } = storeToRefs(surveyStore)

const classNotification = computed(() => ({
  'bg-emerald-500': notification.value.type === 'success',
  'bg-red-500': notification.value.type === 'error',
}))

</script>
