import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ChessComPlayer, ProfileStatsType } from '@/types/profile'

export const useChessProfileStore = defineStore('profile', () => {
  const profileListLoading = ref(false)
  const profileLoading = ref(false)


  const profile = ref<ChessComPlayer>()
  const profileList = ref<ChessComPlayer[]>([])
  const profileStats = ref<ProfileStatsType>()

  return { profile, profileLoading, profileStats, profileList, profileListLoading }
})
