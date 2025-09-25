<script lang="ts" setup>
import { Chip } from 'primevue'
import ProgressSpinner from 'primevue/progressspinner'

const props = withDefaults(
  defineProps<{
    loading: boolean
    title?: string
    fullPage?: boolean
    message?: string
  }>(),
  {
    title: '',
    fullPage: false,
  },
)
</script>

<template>
  <Transition name="fade">
    <div
      v-if="loading"
      :class="[
        'inset-0 z-100 flex items-center justify-center bg-black/20',
        fullPage ? 'fixed backdrop-blur-[1.5px]' : 'absolute h-full w-full',
      ]"
      role="alert"
      aria-busy="true"
    >
      <div class="flex flex-col items-center">
        <Chip
          v-if="title"
          class="!px-6 !py-4 !bg-white !rounded-xl shadow-lg !border !border-gray-300 mb-4"
        >
          <h2 class="!text-tertiary text-xl font-semibold">{{ props.title }}</h2>
        </Chip>

        <ProgressSpinner
          :style="{
            width: '48px',
            height: '48px',
          }"
          strokeWidth="6"
        />

        <p v-if="props.message" class="mt-3 text-tertiary text-sm text-center">
          {{ props.message }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
