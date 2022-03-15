<template>
  <div>
    <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    <p class="mt-2 text-center text-sm text-gray-600">
      <router-link
        :to="{name: 'Register'}"
        class="font-medium text-indigo-600 hover:text-indigo-500"
      >
        Register for free
      </router-link>
    </p>
  </div>
  <form class="mt-8 space-y-6" @submit.prevent="login" method="POST" novalidate>
    <ErrorsView
      v-if="Object.keys(errors).length"
      :errors="errors"
      @close="errors = {}"
    />
    <div class="rounded-md shadow-sm -space-y-px">
      <BaseInput
        type="email"
        label="Email Address"
        name="email"
        required
        v-model="user.email"
        inputClass="rounded-t-md"
        placeholder="Email Address"
        autocomplete="email"
        :showLabel="false"
      />
      <BaseInput
        type="password"
        label="Password"
        name="password"
        required
        v-model="user.password"
        inputClass="rounded-b-md"
        placeholder="Password"
        :showLabel="false"
      />
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" name="remember-me" v-model="user.remember" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
      </div>

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
        Sign in
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
import { useAuthStore } from '@/store';
import { getError } from '@/utils/helpers'
import { BaseInput, ErrorsView } from '@/components/base'

const router = useRouter()
const authStore = useAuthStore()

const user = reactive({
  email: null,
  password: null,
  remember: false,
})

const loading = ref(false)
const errors = ref({})

async function login() {
  loading.value = true
  errors.value = {}
  try {
    await authStore.login(user)
    loading.value = false
    router.push({name: 'Dashboard'})
  } catch (err) {
    loading.value = false
    if (err.response.status === 422) {
      errors.value = err.response.data.errors
    }
  }
}
</script>
