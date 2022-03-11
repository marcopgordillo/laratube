<template>
    <div>
        <transition-group name="fade">
          <div
            v-if="message"
            class="flex p-4 mb-4 bg-green-100 rounded-lg dark:bg-green-200"
            role="alert"
          >
            <InformationCircleIcon class="flex-shrink-0 w-5 h-5 text-green-700 dark:text-green-800" />
            <div class="ml-3 text-sm font-medium text-green-700 dark:text-green-800">
              {{ message }}
            </div>
            <button
              type="button"
              @click="emit('close')"
              class="ml-auto -mx-1.5 -my-1.5 bg-green-100 text-green-500 rounded-lg focus:ring-2 focus:ring-green-400 p-1.5 hover:bg-green-200 inline-flex h-8 w-8 dark:bg-green-200 dark:text-green-600 dark:hover:bg-green-300"
              aria-label="Close"
            >
              <span class="sr-only">Close</span>
              <XIcon class="w-5 h-5" />
            </button>
          </div>
          <div
            v-if="error && getType(error) === 'string'"
            key="error"
            class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
            role="alert"
          >
            <InformationCircleIcon class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
            <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
              {{ error }}
            </div>
            <button
              type="button"
              @click="emit('close')"
              class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
              aria-label="Close"
            >
              <span class="sr-only">Close</span>
              <XIcon class="w-5 h-5" />
            </button>
          </div>
          <div
            v-if="error && getType(error) === 'object'"
            key="error-list"
            class="flex p-4 mb-4 bg-red-100 rounded-lg dark:bg-red-200"
            role="alert"
          >
            <InformationCircleIcon class="flex-shrink-0 w-5 h-5 text-red-700 dark:text-red-800" />
            <div class="ml-3 text-sm font-medium text-red-700 dark:text-red-800">
              <ul>
                <li
                    v-for="key in errorKeys"
                    :key="key"
                >
                    <span class="font-bold capitalize">{{ titleCase(key) }}</span>
                    <ul class="ml-2">
                        <li v-for="(item, index) in getErrors(key)" :key="`${index}-error`">
                            {{ item }}
                        </li>
                    </ul>
                </li>
              </ul>
            </div>
            <button
              type="button"
              @click="emit('close')"
              class="ml-auto -mx-1.5 -my-1.5 bg-red-100 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex h-8 w-8 dark:bg-red-200 dark:text-red-600 dark:hover:bg-red-300"
              aria-label="Close"
            >
              <span class="sr-only">Close</span>
              <XIcon class="w-5 h-5" />
            </button>
          </div>
        </transition-group>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { InformationCircleIcon, XIcon } from '@heroicons/vue/solid'

const props = defineProps({
    message: {
      type: String,
      default: null,
    },
    error: {
      type: [Object, String],
      default: null,
    },
})

const emit = defineEmits(['close'])

const errorKeys = computed(() => {
    if (!props.error || getType(props.error) === 'string') {
        return null
    }
    return Object.keys(props.error)
})

const titleCase = value => value.replace('_', ' ')

function getErrors(key) {
    return props.error[key]
}

function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
}
</script>
