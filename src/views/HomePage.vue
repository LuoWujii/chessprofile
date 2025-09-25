<script lang="ts" setup>
import { AppButton, AppCard } from '@/components/base'

import { useChessProfile } from '@/composables/useChessProfile'
import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import { formatDate, timeAgo } from '@/utils/date'
import { capitalize } from '@/utils/text'

const { profile } = storeToRefs(useChessProfileStore())

const { getChessProfile } = useChessProfile()
getChessProfile()
</script>

<template>
  <div>
    <AppCard>
      <div class="flex flex-col">
        <div>
          <img :src="profile?.avatar" class="rounded-full w-20" />
        </div>
        <div class="flex flex-col gap-2">
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Username:</h3>
            <p>{{ profile?.username }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Player ID:</h3>
            <p>{{ profile?.player_id }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Followers:</h3>
            <p>{{ profile?.followers }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Country:</h3>
            <p>{{ profile?.country_details.name }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Status:</h3>
            <p>{{ capitalize(profile?.status) }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">League:</h3>
            <p>{{ profile?.league }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Verified:</h3>
            <i :class="profile?.verified ? 'fi fi-ss-check-circle' : 'fi fi-sr-cross-circle'"></i>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Joined:</h3>
            <p>{{ formatDate(profile?.joined) }}</p>
          </div>
          <div class="flex gap-2">
            <h3 class="!font-semibold w-[90px]">Last Online:</h3>
            <p>{{ capitalize(timeAgo(profile?.last_online)) }}</p>
          </div>
        </div>
      </div>
    </AppCard>

    <AppButton severity="secondary" label="Test" />
  </div>
</template>
