<script lang="ts" setup>
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import thunder from '@/assets/logo/thunder.svg'
import { formatDate } from '@/utils/date'
import { AppCard } from '../base'
import { Chip } from 'primevue'
import { computed } from 'vue'
import { ratingDeviation } from '@/constants/link'
import { rdClass } from '@/utils/ratingDeviation'

const { profileStats } = storeToRefs(useChessProfileStore())

const rd = computed(() => profileStats?.value?.chess_blitz?.last?.rd ?? 0)
</script>

<template>
  <AppCard title="Blits ">
    <div class="relative">
      <img :src="thunder" class="w-15 absolute bottom-9 right-74" />
    </div>

    <div class="w-full flex flex-col items-center gap-2">
      <h1 class="!font-semibold">Last:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_blitz?.last?.rating || 0 }}</p>
        <p>{{ formatDate(profileStats?.chess_blitz?.last?.date) }}</p>
        <div class="flex gap-2">
          <p>Rd:</p>
          <a
            :href="ratingDeviation"
            target="_blank"
            v-tooltip.bottom="rdClass(rd).label"
            :class="['!font-semibold cursor-pointer hover:underline', rdClass(rd).class]"
          >
            {{ rd }}
          </a>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center gap-2 my-5">
      <h1 class="!font-semibold">Best:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_blitz?.best?.rating }}</p>
        <p>{{ formatDate(profileStats?.chess_blitz?.best?.date) }}</p>
        <div class="flex gap-2">
          <p></p>
          <a
            v-tooltip.bottom="profileStats?.chess_blitz?.best?.game"
            :href="profileStats?.chess_blitz?.best?.game"
            target="_blank"
            class="underline"
            >Chess.com</a
          >
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center">
      <h1 class="!font-semibold my-5">Record:</h1>
      <div class="flex justify-evenly w-full">
        <Chip v-tooltip.bottom="'Wins'" class="w-[100px] !bg-green-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_blitz?.record?.win || 0 }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Loses'" class="w-[100px] !text-center !bg-red-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_blitz?.record?.loss || 0 }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Draws'" class="w-[100px] !text-center !bg-gray-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_blitz?.record?.draw || 0 }}
          </p></Chip
        >
      </div>
    </div>
  </AppCard>
</template>
