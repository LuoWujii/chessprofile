<script lang="ts" setup>
import { AppButton, AppCard } from '@/components/base'

import { useChessProfile } from '@/composables/useChessProfile'
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import { formatDate, timeAgo } from '@/utils/date'
import { capitalize } from '@/utils/text'
import userAvatar from '@/assets/logo/default-avatar.svg'
import AppSkeletonLoader from '@/components/base/AppSkeletonLoader.vue'
import { useRouter } from 'vue-router'
import router from '@/router'

const { profile, profileList, profileListLoading } = storeToRefs(useChessProfileStore())

const { getUserProfile, getRandomPlayers } = useChessProfile()
getUserProfile()

if (!profileList.value.length) {
  getRandomPlayers()
}

const getInfo = (username: string) => {
  router.push({
    path: '/profile',
    query: { search: username },
  })
}
</script>

<template>
  <div
    class="mt-10 grid gap-4 lg:grid-cols-3 md:grid-cols-2 place-items-center grid-cols-1 mb-10 px-4"
  >
    <AppCard
      class="max-w-110 transition-all duration-400 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
    >
      <div class="w-full bg-[#3a3b3c] border-2 h-20 rounded-2xl relative mb-10">
        <div>
          <img
            :src="profile?.avatar"
            class="rounded-full w-20 absolute top-8 border-3 left-35 transition-all duration-300 hover:scale-110 hover:border-green-400"
          />
        </div>
      </div>

      <img
        :src="`https://flagsapi.com/${profile?.country_details.code}/flat/64.png`"
        class="w-8 h-8"
        :alt="profile?.country_details.name"
      />

      <div class="flex flex-col">
        <div class="flex justify-between gap-2">
          <div class="gap-2">
            <h3 class="!font-semibold w-[90px]">Username</h3>
            <p class="transition-colors duration-300 group-hover:text-[#6366f1]">
              {{ profile?.username }}
            </p>
          </div>
          <div class="gap-2">
            <h3 class="!font-semibold w-[90px]">Player ID</h3>
            <p class="transition-colors duration-300 group-hover:text-[#6366f1]">
              {{ profile?.player_id }}
            </p>
          </div>
        </div>
      </div>
    </AppCard>

    <AppSkeletonLoader v-for="i in 5" :key="i" v-if="profileListLoading" />
    <AppCard
      v-for="user in profileList"
      :key="user['@id']"
      class="max-w-110 transition-all duration-400 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      @click="getInfo(user.username)"
    >
      <div
        class="group w-full bg-[#3a3b3c] border-2 h-20 hover:border-green-400 transition-all duration-300 hover:scale-103 rounded-2xl relative mb-10"
      >
        <img
          :src="user?.avatar ? user.avatar : userAvatar"
          class="rounded-full w-20 absolute top-8 border-3 left-35 transition-all duration-300 group-hover:scale-110 group-hover:border-green-400"
        />
      </div>
      <img
        :src="`https://flagsapi.com/${user?.country_details.code}/flat/64.png`"
        class="w-8 h-8"
      />
      <div class="flex flex-col">
        <div class="flex justify-between gap-2">
          <div class="gap-2">
            <h3 class="!font-semibold w-[90px]">Username</h3>
            <p class="transition-colors duration-300 group-hover:text-[#6366f1]">
              {{ user?.username }}
            </p>
          </div>
          <div class="gap-2">
            <h3 class="!font-semibold w-[90px]">Player ID</h3>
            <p class="transition-colors duration-300 group-hover:text-[#6366f1]">
              {{ user?.player_id }}
            </p>
          </div>
        </div>
      </div>
    </AppCard>
  </div>
</template>
