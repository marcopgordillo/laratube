<template>
  <div class="relative pt-2 max-w-full mb-3">
    <div class="flex mb-2 items-center justify-between space-x-6">
      <div>
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
          {{ title }}
        </span>
      </div>
      <div class="text-right">
        <span class="text-xs font-semibold inline-block text-indigo-600">
          {{ progress }}%
        </span>
      </div>
    </div>
    <div class="flex h-4 overflow-hidden text-xs bg-slate-200 rounded">
      <div
        role="progressbar"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        class="flex items-center justify-center overflow-hidden text-white whitespace-nowrap bg-blue-600 transition-[width] ease duration-75 bg-striped bg-[length:1rem_1rem] animate-progress-striped w-progress"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    required: true,
    type: Number,
  },
  title: {
    required: true,
    type: String,
  },
  text: {
    required: true,
    type: String,
  }
})
</script>

<style scoped>
  .w-progress {
    @apply w-[v-bind(`${progress}%`)];
  }
</style>
