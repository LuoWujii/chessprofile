<script lang="ts" setup>
import headerLogo from '../assets/logo/logoHeader.png'
</script>
<template>
  <div class="w-full h-20 border-b-1">
    <div class="w-full flex justify-between items-center h-full px-30">
      <router-link to="/"><img :src="headerLogo" class="w-40 mt-2" /></router-link>
    </div>
  </div>
</template>
