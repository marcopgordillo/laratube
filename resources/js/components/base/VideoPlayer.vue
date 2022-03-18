<template>
  <video ref="videoPlayer" class="video-js vjs-theme-city"></video>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import videojs from 'video.js'

const { video } = defineProps({
  video: {
    required: true,
    type: Object,
  }
})

const options = {
  autoplay: false,
  controls: true,
  preload: 'auto',
  poster: video.thumb,
  width: 640,
  height: 268,
  sources: [
    {
      src: video.live_url,
      type: 'application/x-mpegURL'
    }
  ]
}

const videoPlayer = ref(null)
let player = null

onMounted(() => {
  player = videojs(videoPlayer.value, options, function onPlayerReady() {
    videojs.log('onPlayerReady', this)
  })
})
onBeforeUnmount(() => player.dispose())
</script>

<style>
@import 'video.js/dist/video-js.css';
@import '@videojs/themes/dist/city/index.css';
</style>
