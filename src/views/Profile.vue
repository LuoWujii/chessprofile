<script lang="ts" setup>
import { AppCard, AppLoader } from '@/components/base'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import { useChessProfile } from '@/composables/useChessProfile'
import { useChessProfileStore } from '@/stores/chessProfile'
import { formatDate } from '@/utils/date'
import { storeToRefs } from 'pinia'
import { Chip } from 'primevue'
import { watch } from 'vue'
import { useRoute } from 'vue-router'

import thunder from '@/assets/logo/thunder.svg'
import bullet from '@/assets/logo/bullet.svg'
import { ref } from 'vue'
import RapidCard from '@/components/profile/RapidCard.vue'
import BlitzCard from '@/components/profile/BlitzCard.vue'
import BulletCard from '@/components/profile/BulletCard.vue'

const route = useRoute()

const { getUserProfile, getProfileStats } = useChessProfile()
const loading = ref(false)

watch(
  () => route.query.search,
  async (newSearch) => {
    loading.value = true
    try {
      const username = typeof newSearch === 'string' ? newSearch : undefined
      await Promise.all([getUserProfile(username), getProfileStats(username)])
    } finally {
      loading.value = false
    }
  },
  { immediate: true },
)
</script>
<template>
  <AppLoader v-if="loading" full-page />
  <div class="px-6">
    <ProfileHeader />
    <div class="w-full mt-12 md:mt-22">
      <div class="grid lg:grid-cols-3 grid-cols-1 w-full gap-6">
        <RapidCard />
        <BlitzCard />
        <BulletCard />
      </div>
    </div>
  </div>
</template>
