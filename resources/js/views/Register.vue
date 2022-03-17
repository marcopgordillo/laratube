<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register for free</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      <router-link
        :to="{name: 'Login'}"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Login to your account
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="register" method="POST" novalidate>
    <ErrorsView
      v-if="Object.keys(errors).length"
      :errors="errors"
      @close="errors = {}"
    />
    <div class="rounded-md shadow-sm -space-y-px">
      <BaseInput
        type="text"
        label="Full Name"
        name="name"
        v-model="user.name"
        inputClass="rounded-t-md"
        placeholder="Full name"
        autocomplete="name"
        :showLabel="false"
      />
      <BaseInput
        type="email"
        label="Email Address"
        name="email"
        v-model="user.email"
        placeholder="Email Address"
        autocomplete="email"
        :showLabel="false"
      />
      <BaseInput
        type="password"
        label="Password"
        name="password"
        v-model="user.password"
        placeholder="Password"
        :showLabel="false"
      />
      <BaseInput
        type="password"
        label="Confirm Password"
        name="password_confirmation"
        v-model="user.password_confirmation"
        placeholder="Confirm Password"
        inputClass="rounded-b-md"
        :showLabel="false"
      />
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        :class="{'cursor-not-allowed': loading, 'hover:bg-indigo-500': loading}"
      >
        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
          <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
        </span>

        <LoadingIcon v-if="loading" class="animate-spin -ml-1 mr-3 h-5 w-5" />
        Sign up
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon, XIcon } from '@heroicons/vue/solid'
import { LoadingIcon } from '@/components/icons'
import { AuthService } from '@/services'
import { useAuthStore } from '@/store'
import { BaseInput, ErrorsView } from '@/components/base'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const errors = ref({})
const user = reactive({
  name: null,
  email: null,
  password: null,
  password_confirmation: null,
})

async function register() {
  loading.value = true
  errors.value = {}
  try {
    await authStore.registerUser(user)
    router.push({name: 'Dashboard'})
  } catch (err) {
    if (err.response.status === 422) {
      errors.value = err.response.data.errors
    } else {
      errors.value = {error: [err.response.data.message]}
    }
  } finally {
    loading.value = false
  }
}
</script>
