<template>
  <div class="flex justify-between space-x-2 mb-2 items-center">
    <label :for="item">{{ item }}</label>
    <progress :id="item" :value="progress[item]" max="100">
      <div class="bg-gray-100 rounded-sm shadow-[0_2px_3px_rgba(0,0,0,0.25)_inset] w-16 h-1.5 relative block">
        <span
          class="bg-blue-500 rounded-sm block -indent-[9999px]"
          :style="{width: `${progress[item]}%`}"
        >
          {{ progress[item] }}%
        </span>
      </div>
    </progress>
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
progress[value] {
  @apply w-60 h-5 appearance-none;

  &::-moz-progress-bar {
   @apply bg-[#eee] rounded-[2px] shadow-[0_2px_5px_rgba(0,0,0,0.25)_inset];
  }
  &::-webkit-progress-bar {
   @apply bg-[#eee] rounded-[2px] shadow-[0_2px_5px_rgba(0,0,0,0.25)_inset];
  }

  &::-webkit-progress-value {
   @apply rounded-sm bg-progress animate-progress-stripes before:content-[v-bind(progress[item])+'%'] before:absolute before:right-0 before:-top-[125%] after:content-none after:w-1.5 after:h-1.5 after:absolute after:rounded-full after:right-2 after:top-2 after:bg-white;
  }
}
</style>
