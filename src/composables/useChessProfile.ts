import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { $fetch } from 'ofetch'

export function useChessProfile() {
  // Helper
  const loading = ref(false)
  const errors = ref()

  // Data
  const { profile, profileLoading, profileStats } = storeToRefs(useChessProfileStore())

  async function getChessProfile(user?: string | undefined) {
    profileLoading.value = true
    try {
      const response = await $fetch(
        `https://api.chess.com/pub/player/${user ? user : 'chenbeixuann'}`,
      )

      const country_details = ref()
      if (response.country) {
        country_details.value = await $fetch(response.country)
      }
      const alt_name = ref<string>()

      if (!response.name) {
        alt_name.value = 'Walter Gang'
      }

      profile.value = {
        ...response,
        country_details,
        alt_name,
      }
    } catch (error) {
      errors.value = error
    } finally {
      profileLoading.value = false
    }
  }
  async function getProfileStats(user?: string | undefined) {
    profileLoading.value = true
    try {
      const response = await $fetch(
        `https://api.chess.com/pub/player/${user ? user : 'chenbeixuann'}/stats`,
      )

      profileStats.value = response
    } catch (error) {
      errors.value = error
    } finally {
      profileLoading.value = false
    }
  }

  return { getChessProfile, getProfileStats }
}
