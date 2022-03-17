<template>
  <div class="relative pt-2 max-w-full">
    <div class="flex mb-2 items-center justify-between space-x-6">
      <div>
        <span class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-600 bg-indigo-200">
          {{ item }}
        </span>
      </div>
      <div class="text-right">
        <span class="text-xs font-semibold inline-block text-indigo-600">
          {{ progress[item] }}%
        </span>
      </div>
    </div>
    <div class="overflow-hidden h-3 mb-4 text-xs flex rounded bg-indigo-200">
      <div
        class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 w-progress"
      ></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  progress: {
    required: true,
    type: Object,
  },
  item: {
    required: true,
    type: String,
  }
})
</script>

<style scoped>
  .w-progress {
    @apply w-[v-bind(`${progress[item]}%`)];
  }
</style>
