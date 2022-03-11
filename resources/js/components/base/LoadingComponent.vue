<template>
  <div class="flex items-center justify-center">
    <div class="inline-flex px-4 py-2 font-semibold text-sm shadow rounded-md text-white bg-indigo-500">
      <LoadingIcon class="animate-spin -ml-1 mr-3 h-5 w-5" />
      loading...
    </div>
  </div>
</template>

<script setup>
import { LoadingIcon } from '../icons'
</script>
