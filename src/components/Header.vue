<script lang="ts" setup>
import headerLogo from '../assets/logo/logoHeader.png'
</script>
<template>
  <div class="w-full h-20 border-b-1 flex justify-center">
    <div
      class="w-full max-w-[1280px] flex lg:justify-between justify-center items-center px-6 h-full"
    >
      <router-link to="/"><img :src="headerLogo" class="w-40 mt-2" /></router-link>
    </div>
  </div>
</template>
