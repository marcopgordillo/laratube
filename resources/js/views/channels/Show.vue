<template>
  <div class="mt-5 container mx-auto">
    <router-link
      v-if="channel.id"
      :to="{ name: 'VideosShow', params: { id: channel.id } }"
      class="bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow border border-red-500 focus:ring-4 focus:ring-red-300 px-4 py-2"
    >
      Upload Videos
    </router-link>
    <loading-component v-if="loading"></loading-component>
    <form v-else @submit.prevent="submitForm" class="flex flex-col items-center">
      <ErrorsView
        v-if="Object.keys(errors).length"
        :errors="errors"
        @close="errors = {}"
      />
      <div class="relative mb-4 w-1/3 flex flex-col items-center justify-center">
        <img
          class="w-64 h-64 object-cover"
          v-if="channel?.image"
          :src="channel.image"
          :alt="channel.name"
        />
        <span v-else class="flex items-center justify-center h-64 w-64 rounded-full overflow-hidden bg-gray-100">
          <PhotographIcon class="h-[80%] w-[80%] text-gray-300" />
        </span>
        <button
          type="button"
          v-if="isEditable"
          class="relative overflow-hidden mt-2 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-300"
        >
          <input
            id="image"
            v-if="isEditable"
            @change="onImageUpload"
            type="file"
            accept="image/*"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          Change
        </button>
        <button type="button"
          @click="toggleSubscribe"
          v-else-if="isLogged"
          class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:bg-gray-500 disabled:hover:bg-gray-500"
        >
          {{ isSubscribed ? 'Unsubscribe' : 'Subscribe' }} {{ subscriptions  }}
        </button>
        <span
          v-if="isEditable"
          class="bg-red-500 text-white text-sm font-semibold block rounded px-4 py-2 mt-3"
        >
          {{ subscriptions }} Subscriptors
        </span>
      </div>
      <div class="mb-6 w-1/2">
        <label for="name" class="sr-only">Name</label>
        <input
          v-model="channel.name"
          :disabled="!isEditable"
          id="name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          placeholder="Your Name"
        />
      </div>
      <div class="mb-6 w-1/2">
        <label for="description" class="sr-only">Description</label>
        <textarea
          id="description"
          :disabled="!isEditable"
          v-model="channel.description"
          rows="5"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your Description"
        ></textarea>
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
import { PhotographIcon } from '@heroicons/vue/outline'
import { useChannelStore, useAuthStore } from '@/store'
import  { Notification, ErrorsView } from '@/components/base';

const channelStore = useChannelStore()
const authStore = useAuthStore()
const route = useRoute()
const router = useRouter()

const channel = ref({
  name: null,
  image: null,
  image_upload: null,
  description: null,
})

const errors = ref({})
const loading = ref(false)
const subscriptions = computed(() => channelStore.getSubscriptions)
const isSubscribed = computed(() => channel.value.is_subscribed)

const isEditable = computed(() => {
  return authStore.getUser?.id && authStore.getUser.id === channel.value.user?.id
})

const isLogged = computed(() => authStore.getUser?.id !== undefined)

watch(
  () => channelStore.getChannel,
  (newVal, oldVal) => {
    channel.value = {
      ...JSON.parse(JSON.stringify(newVal)),
    }
  }
)

watch(
  () => channelStore.getLoading,
  (newVal, oldVal) => {
    loading.value = newVal
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

const notification = channelStore.getNotification

const onImageUpload = (ev) => {
  const file = ev.target.files[0]

  const reader = new FileReader()
  reader.onload = () => {
    // to frontend
    channel.value.image = reader.result
    // to backend
    channel.value.image_upload = file
  }
  reader.readAsDataURL(file)
}

const submitForm = async () => {
  const form = new FormData()
  form.append('name', channel.value.name)
  form.append('description', channel.value.description)
  if (channel.value.image_upload) {
    form.append('image', channel.value.image_upload)
  }
  form.append('_method', 'PUT')
  try {
    errors.value = {}
    await channelStore.saveChannel(form)
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
  }
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
