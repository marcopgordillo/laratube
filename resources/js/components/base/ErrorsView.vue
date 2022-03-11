<template>
    <Alert
      class="flex items-center justify-center text-sm"
    >
      <ul class="list-disc">
        <li v-for="(error, index) of errorsFormated" :key="index">
          {{ error }}
        </li>
      </ul>
      <span
        @click="emit('close')"
        class="w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer hover:bg-black/20"
      >
        <XIcon class="h-6 w-6" />
      </span>
    </Alert>
</template>

<script setup>
import { computed } from 'vue'
import { XIcon } from '@heroicons/vue/solid'
import { Alert } from '.'

const { errors } = defineProps({
  errors: Object
})

const emit = defineEmits(['close'])

const errorsFormated = computed(() => {
  return Object.keys(errors).reduce((res, item) => {
    return [...res,...errors[item]]
  }, [])
})

</script>
