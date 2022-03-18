<template>
  <main
    v-if="currentVideo.id"
    class="flex flex-col justify-center container mx-auto"
  >
    <h1 class="text-4xl font-bold mt-4 text-center">{{ currentVideo.title }}</h1>
    <div class="mt-4 mx-auto">
      <VideoPlayer
        :video="currentVideo"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from "vue-router"
import { storeToRefs } from 'pinia'
import { useChannelStore } from '@/store'
import { VideoPlayer } from '@/components/base'

const channelStore = useChannelStore()
const route = useRoute()

channelStore.getVideo(route.params.id)
const { currentVideo } = storeToRefs(channelStore)
</script>
