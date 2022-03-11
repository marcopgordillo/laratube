<template>
  <page-component title="Dashboard">
    <loading-component v-if="dashboard.loading"></loading-component>
  </page-component>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { PencilIcon, EyeIcon } from '@heroicons/vue/outline'
import { PageComponent } from '@/components/base';
import { useMainStore } from '@/store'

const mainStore = useMainStore()
const { dashboard } = storeToRefs(mainStore)

mainStore.getDashboardData()
</script>
