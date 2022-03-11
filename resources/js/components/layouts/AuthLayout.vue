<template>
   <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store'
import { LockClosedIcon } from '@heroicons/vue/solid'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

</script>
