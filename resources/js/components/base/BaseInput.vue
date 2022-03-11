<template>
  <div>
    <label
      :for="name"
       class="text-sm text-gray-500"
      :class="{'sr-only': !showLabel}"
    >
      {{ label }}
    </label>
    <input
      :id="name"
      :name="name"
      v-model="value"
      :type="type"
      :autocomplete="autocomplete"
      :required="required"
      :class="[inputClass]"
      class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup>
import { computed } from "vue"

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  showLabel: {
    type: Boolean,
    default: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: null,
  },
  autocomplete: {
    type: String,
    default: null,
  },
  inputClass: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
