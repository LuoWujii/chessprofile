import { useChessProfileStore } from '@/stores/chessProfile'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { $fetch } from 'ofetch'
import type { ChessComPlayer } from '@/types/profile'
import { shuffleArray } from '@/utils/shuffle'

export function useChessProfile() {
  const countries = [
    'US',
    'CN',
    'RU',
    'IN',
    'PH',
    'DE',
    'FR',
    'BR',
    'CA',
    'ES',
    'IT',
    'GB',
    'PL',
    'AU',
    'JP',
    'KR',
    'VN',
    'MX',
    'AR',
    'TR',
  ]
  // Helper

  const loading = ref(false)
  const errors = ref<any>()
  // Data
  const { profile, profileLoading, profileStats, profileList, profileListLoading } =
    storeToRefs(useChessProfileStore())

  async function getChessProfile(user?: string | undefined, query: string | undefined = '') {
    profileLoading.value = true
    try {
      return await $fetch(`https://api.chess.com/pub/player/${user}${query}`)
    } catch (error) {
      errors.value = error
    } finally {
      profileLoading.value = false
    }
  }

  async function getUserProfile(user?: string | undefined) {
    profileLoading.value = true
    try {
      const response = await getChessProfile(user ? user : 'chenbeixuann')
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
      const response = await getChessProfile(user, '/stats')

      profileStats.value = response
    } catch (error) {
      errors.value = error
    } finally {
      profileLoading.value = false
    }
  }

  async function getRandomPlayers(countryCount: number = 15, playersPerCountry: number = 1) {
    profileListLoading.value = true
    try {
      // pick N random countries using Fisher-Yates shuffle
      const randomCountries = shuffleArray(countries).slice(0, countryCount)

      const allProfiles: any[] = []

      await Promise.all(
        randomCountries.map(async (countryCode) => {
          // fetch players for this country
          const res = await $fetch<{ players: string[] }>(
            `https://api.chess.com/pub/country/${countryCode}/players`,
          )
          const countryPlayers = res.players || []
          const randomPlayers = shuffleArray(countryPlayers).slice(0, playersPerCountry)
          const country_details = await $fetch(`https://api.chess.com/pub/country/${countryCode}`)
          const profiles = await Promise.all(randomPlayers.map((user) => getChessProfile(user)))

          profiles.forEach((player) => {
            if (player) {
              allProfiles.push({
                ...player,
                country_details,
                alt_name: player.name || 'Walter Gang',
              })
            }
          })
        }),
      )

      profileList.value = allProfiles
    } catch (error) {
      errors.value = error
    } finally {
      profileListLoading.value = false
    }
  }

  return { getUserProfile, getProfileStats, getRandomPlayers }
}
