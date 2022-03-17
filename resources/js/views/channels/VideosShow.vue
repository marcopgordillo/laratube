<template>
  <div class="mt-5 container mx-auto">
    <loading-component v-if="loading"></loading-component>
    <form v-else @submit.prevent="submitForm" class="flex flex-col items-center">
      <ErrorsView
        v-if="Object.keys(errors).length"
        :errors="errors"
        @close="errors = {}"
      />
      <div v-if="Object.keys(progress).length">
        <ProgressBar v-for="key in Object.keys(progress)" :key="key" :item="key" :progress="progress" />
      </div>
      <div
        v-else-if="isEditable"
        class="relative mb-4 w-1/3 flex flex-col items-center justify-center">
        <button
          type="button"
          class="relative overflow-hidden mt-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
        >
          <label for="videos" class="sr-only">Upload your videos</label>
          <input
            id="videos"
            ref="videos"
            multiple
            v-if="isEditable"
            type="file"
            accept="video/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          <span class="flex items-center justify-center h-32 w-32 rounded-full overflow-hidden bg-gray-100">
            <UploadIcon class="h-[80%] w-[80%] text-gray-300" />
          </span>
        </button>
      </div>
      <div>
        <button type="submit"
          v-if="isEditable"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </div>
    </form>
    <Notification :notification="notification" />
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { UploadIcon } from '@heroicons/vue/outline'
import { useChannelStore, useAuthStore } from '@/store'
import  { Notification, ErrorsView, ProgressBar } from '@/components/base';

const channelStore = useChannelStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const channel = ref({
  name: null,
  image: null,
  description: null,
})

const videos = ref(null)

const errors = ref({})
const { progress, loading } = storeToRefs(channelStore)
const notification = channelStore.getNotification

const isEditable = computed(() => {
  return authStore.getUser?.id && authStore.getUser.id === channel.value.user?.id
})

watch(
  () => channelStore.getChannel,
  (newVal, oldVal) => {
    channel.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    }
  }
)

const fetchChannel = async (id, loggedId = null) => {
  try {
    await channelStore.fetchChannel({id, loggedId})
  } catch (err) {
    if (err.response.status === 404) {
      router.push('/NotFound')
    }
  }
}

if (route.params.id) {
  fetchChannel(route.params.id, authStore.getUser?.id)
}

const submitForm = () => {
  const videosToUpload = Array.from(videos.value.files)

  videosToUpload.forEach(async (video) => {
    const form = new FormData()
    form.append('video', video)
    form.append('title', video.name)
    try {
      errors.value = {}
      await channelStore.uploadVideo(form)
      channelStore.notify({
        type: 'success',
        message: 'Channel was successfully updated!',
      })
    } catch (err) {
      if (err.response.status === 422) {
        errors.value = err.response.data.errors
      } else {
        errors.value = {error: [err.response.data.message]}
      }
    } finally {
      channelStore.deleteProgress(video.name)
    }
  })
}

const toggleSubscribe = async () => {
  try {
    errors.value = {}
    await channelStore.toggleSubscribe(authStore.getUser.id)
  } catch (err) {
    if (err.response.status === 422) {
      errors.value = err.response.data.errors
    } else {
      errors.value = {error: [err.response.data.message]}
    }
  }
}

</script>
