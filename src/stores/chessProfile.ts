import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { ChessComPlayer, ProfileStatsType } from '@/types/profile'

export const useChessProfileStore = defineStore('profile', () => {
  const profileListLoading = ref(false)
  const profileLoading = ref(false)


  const profile = ref<ChessComPlayer>()
  const profileList = ref<ChessComPlayer[]>([])
  const searchUser = ref()
  const profileStats = ref<ProfileStatsType>()

  return { profile, searchUser, profileLoading, profileStats, profileList, profileListLoading }
})
