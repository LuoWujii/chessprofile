<script lang="ts" setup>
import { AppButton, AppCard } from '@/components/base'

import { useChessProfile } from '@/composables/useChessProfile'
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import { formatDate, timeAgo } from '@/utils/date'
import { capitalize } from '@/utils/text'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { InputText } from 'primevue'
import { useRouteQuery } from '@vueuse/router'
import { useDebounce } from '@vueuse/core'
import userAvatar from '@/assets/logo/default-avatar.svg'

const { profile } = storeToRefs(useChessProfileStore())
const router = useRouter()

// actual query param
const search = useRouteQuery<string>('search', '')

// local input value
const input = ref<string>(search.value)

// debounce input updates
const debounced = useDebounce<string>(input, 500)

// when debounced changes, sync back to route query
watch(debounced, (val) => {
  search.value = val
})

const goBack = () => {
  router.back()
  profile.value = undefined
}
</script>

<template>
  <div class="w-full h-50 bg-[#3a3b3c] rounded-b-2xl border-1 border-t-0">
    <div class="relative w-[200px]">
      <img
        :src="profile?.avatar ? profile?.avatar : userAvatar"
        class="rounded-full w-25 md:w-35 absolute top-32 md:top-25 left-6 border-4"
      />
    </div>

    <div class="w-full h-full">
      <div class="h-full flex flex-col w-full">
        <div class="w-full flex justify-between px-5 pt-5 h-fit">
          <AppButton
            @click="goBack"
            icon="fi fi-rr-arrow-small-left"
            icon-pos="left"
            label="Return to list"
            variant="outlined"
            class="!hidden sm:!flex"
          />
          <AppButton
            @click="goBack"
            icon="fi fi-rr-arrow-small-left"
            icon-pos="left"
            variant="outlined"
            class="sm:!hidden"
          />

          <InputText v-model="input" class="!border-none" placeholder="Search user..." />
        </div>
        <div class="mt-auto pl-35 md:pl-50">
          <div class="flex items-center">
            <h1
              v-if="profile?.title"
              class="bg-[#7c2929] h-fit px-1 rounded-lg text-white !font-semibold mr-1"
            >
              {{ profile?.title }}
            </h1>
            <h1 class="text-2xl mr-2 text-white !font-semibold">
              {{ capitalize(profile?.username) }}
            </h1>

            <img
              :src="`https://flagsapi.com/${profile?.country_details.code}/flat/64.png`"
              class="w-8 h-8"
              :alt="profile?.country_details.name"
            />
          </div>
          <!-- class="w-8 h-8" -->
          <div class="flex gap-3 mb-4">
            <p>{{ profile?.name ? profile?.name : profile?.alt_name }}</p>

            <div class="flex gap-1">
              <i class="fi fi-rs-marker"></i>
              <p>{{ profile?.location ? profile?.location : profile?.country_details.name }}</p>
            </div>
          </div>
          <div class="gap-4 mb-2 mt-auto hidden md:flex">
            <div class="flex gap-2">
              <h3 class="!font-semibold">Joined:</h3>
              <p>{{ formatDate(profile?.joined) }}</p>
            </div>
            <div class="flex gap-2">
              <h3 class="!font-semibold">Last Online:</h3>
              <p>{{ capitalize(timeAgo(profile?.last_online)) }}</p>
            </div>
            <div class="flex gap-2">
              <h3 class="!font-semibold">Followers:</h3>
              <p>{{ profile?.followers }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
