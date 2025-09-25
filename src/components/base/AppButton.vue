<script setup lang="ts">
import { Button } from 'primevue'

// Expose the main PrimeVue props you care about
defineProps<{
  label?: string
  icon?: string
  iconPos?: 'left' | 'right' | 'top' | 'bottom'
  severity?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'help' | 'danger'
  outlined?: boolean
  rounded?: boolean
  text?: boolean
  size?: 'small' | 'large'
  disabled?: boolean
}>()
</script>

<template>
  <Button
    v-bind="$props"
    v-on="$attrs"
    :class="[
      // ✅ Tailwind defaults
      'px-4 py-2 rounded-lg font-medium transition-all duration-200',

      // ✅ Theme per severity (you can expand this)
      severity === 'success' && 'bg-green-600 text-white hover:bg-green-700',
      severity === 'danger' && 'bg-red-400 text-white hover:bg-red-600',
      severity === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
      severity === 'secondary' && 'bg-gray-200 text-gray-800 hover:bg-gray-300',

      // ✅ Handle text buttons
      text && 'bg-transparent shadow-none hover:bg-gray-100',

      // ✅ Handle disabled
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
  />
</template>
