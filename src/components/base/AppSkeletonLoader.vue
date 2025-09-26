<template>
  <AppCard class="card">
    <!-- Avatar and Text -->

    <!-- Main Content -->

    <Skeleton width="100%" height="80px" />
    <div class="w-full relative h-10">
      <Skeleton shape="circle" size="5rem" class="mr-2 absolute bottom-10 left-33" />
    </div>
    <!-- Actions -->
    <Skeleton width="3rem" height="2rem" />
    <div class="flex justify-between mt-2">
      <Skeleton width="6rem" height="1rem" />
      <Skeleton width="6rem" height="1rem" />
    </div>
    <div class="flex justify-between mt-1">
      <Skeleton width="6rem" height="1rem" />
      <Skeleton width="6rem" height="1rem" />
    </div>
  </AppCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import Skeleton from 'primevue/skeleton'
import { AppCard } from '.'

const props = defineProps({
  cards: { type: Number, default: 1 },
  columns: { type: Number, default: 1 },
})
</script>

<style scoped>
.card {
  width: 100%;
}
</style>
