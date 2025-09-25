<script lang="ts" setup>
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import Bullet from '@/assets/logo/bullet.svg'
import { formatDate } from '@/utils/date'
import { AppCard } from '../base'
import { Chip } from 'primevue'
import { computed } from 'vue'
import { ratingDeviation } from '@/constants/link'

const { profileStats } = storeToRefs(useChessProfileStore())
const rd = computed(() => profileStats?.value?.chess_bullet.last.rd ?? 0)
const rdClass = computed(() => (rd.value <= 50 ? 'text-green-400' : 'text-red-500'))
</script>

<template>
  <AppCard title="Bullet">
    <div class="relative">
      <img :src="Bullet" class="w-15 absolute bottom-9 right-72 !text-[#e3aa24]" />
    </div>

    <div class="w-full flex flex-col items-center gap-2">
      <h1 class="!font-semibold">Last:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_bullet.last.rating }}</p>
        <p>{{ formatDate(profileStats?.chess_bullet.last.date) }}</p>
        <div class="flex gap-2">
          <p>Rd:</p>
          <a
            :href="ratingDeviation"
            target="_blank"
            v-tooltip.bottom="
              'Rating Deviation (RD): Lower is better. Shows how confident the system is about your rating.'
            "
            :class="['!font-semibold cursor-pointer hover:underline', rdClass]"
          >
            {{ rd }}
          </a>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center gap-2 my-5">
      <h1 class="!font-semibold">Best:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_bullet.best.rating }}</p>
        <p>{{ formatDate(profileStats?.chess_bullet.best.date) }}</p>
        <div class="flex gap-2">
          <a
            v-tooltip.bottom="profileStats?.chess_bullet.best.game"
            :href="profileStats?.chess_bullet.best.game"
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
            {{ profileStats?.chess_bullet.record.win }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Loses'" class="w-[100px] !text-center !bg-red-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_bullet.record.loss }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Draws'" class="w-[100px] !text-center !bg-gray-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_bullet.record.draw }}
          </p></Chip
        >
      </div>
    </div>
  </AppCard>
</template>
