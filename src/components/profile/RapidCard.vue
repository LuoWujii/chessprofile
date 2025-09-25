<script lang="ts" setup>
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import Timer from '@/assets/logo/timer.svg'
import { formatDate } from '@/utils/date'
import { AppCard } from '../base'
import { Chip } from 'primevue'
import { computed } from 'vue'
import { ratingDeviation } from '@/constants/link'

const { profileStats, profileLoading } = storeToRefs(useChessProfileStore())

const rd = computed(() => profileStats?.value?.chess_rapid.last.rd ?? 0)

const rdClass = computed(() => (rd.value < 50 ? 'text-green-400' : 'text-red-500'))
</script>

<template>
  <AppCard title="Rapid " class="">
    <div class="relative">
      <img :src="Timer" class="w-15 absolute bottom-9 right-73" />
    </div>

    <div class="w-full flex flex-col items-center gap-2">
      <h1 class="!font-semibold">Last:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_rapid.last.rating }}</p>
        <p>{{ formatDate(profileStats?.chess_rapid.last.date) }}</p>
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
            {{ profileStats?.chess_rapid.last.rd }}
          </a>
        </div>
      </div>
    </div>
    <div class="w-full flex flex-col items-center gap-2 my-5">
      <h1 class="!font-semibold">Best:</h1>
      <div class="flex justify-evenly w-full">
        <p>Rating: {{ profileStats?.chess_rapid.best.rating }}</p>
        <p>{{ formatDate(profileStats?.chess_rapid.best.date) }}</p>
        <div class="flex gap-2">
          <p></p>
          <a
            v-tooltip.bottom="profileStats?.chess_rapid.best.game"
            :href="profileStats?.chess_rapid.best.game"
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
            {{ profileStats?.chess_rapid.record.win }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Loses'" class="w-[100px] !text-center !bg-red-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_rapid.record.loss }}
          </p></Chip
        >
        <Chip v-tooltip.bottom="'Draws'" class="w-[100px] !text-center !bg-gray-400">
          <p class="text-center w-full !font-semibold">
            {{ profileStats?.chess_rapid.record.draw }}
          </p></Chip
        >
      </div>
    </div>
  </AppCard>
</template>
