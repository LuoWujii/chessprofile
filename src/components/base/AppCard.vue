<script setup lang="ts">
import { Card } from 'primevue'

const {
  title = '',
  icon = '',
  subtitle = '',
  width = 'full',
} = defineProps<{
  title?: string
  icon?: string
  subtitle?: string
  width?: string | number
}>()
</script>
<template>
  <Card class="rounded-lg border !w-full border-gray-200 p-2">
    <template #header>
      <slot name="header" />
    </template>
    <template #title>
      <i v-if="icon" :class="icon"></i>
      <h1 class="text-xl">
        {{ title }}
      </h1>
    </template>
    <template #subtitle>
      <p>
        {{ subtitle }}
      </p>
    </template>
    <template #content>
      <slot />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<style scoped>
:deep(.p-card-caption) {
  align-items: center;
}
</style>
