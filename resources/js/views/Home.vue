<template>
  <h1 class="text-2xl font-bold">Home</h1>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/store'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)

</script>
