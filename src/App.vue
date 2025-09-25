<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  <div class="w-dvw max-w-full">
    <Header />

    <div class="w-full flex justify-center">
      <div class="max-w-[1280px] w-full">
        <RouterView />
      </div>
    </div>
  </div>
</template>
