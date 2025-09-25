import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ChessComPlayer, ProfileStatsType } from '@/types/profile'

export const useChessProfileStore = defineStore('profile', () => {
  const profile = ref<ChessComPlayer>()
  const searchUser = ref()
  const profileStats = ref<ProfileStatsType>()
  const profileLoading = ref(false)

  return { profile, searchUser, profileLoading, profileStats }
})
