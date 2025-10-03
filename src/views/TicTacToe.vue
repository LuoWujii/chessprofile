<script lang="ts" setup>
import { AppButton, AppCard } from '@/components/base'
import { computed, ref } from 'vue'

const tiktac = ref<boolean>(false)
const selected = ref<number[]>([])
const winner = ref<boolean | null>(null)

const object = ref<{ clicked: boolean | null }[]>([
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
  { clicked: null },
])

const winPatterns: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

const checkWinner = () => {
  for (const [a, b, c] of winPatterns) {
    const valA = object.value[a].clicked
    const valB = object.value[b].clicked
    const valC = object.value[c].clicked

    if (valA !== null && valA === valB && valB === valC) {
      winner.value = valA
      return
    }
  }
}

const getIndex = (i: number) => {
  if (winner.value !== null) return
  if (selected?.value.includes(i)) return
  object.value[i].clicked = tiktac.value
  tiktac.value = !tiktac.value
  selected.value.push(i)

  checkWinner()
}

const returnIcon = computed(() => {
  return !tiktac.value
    ? 'opacity-0 group-hover:opacity-30 transition-all duration-200 fi-br-cross'
    : 'opacity-0 group-hover:opacity-30 transition-all duration-200 fi-br-circle'
})
</script>
<template>
  <div class="flex justify-center gap-4">
    <div
      class="w-full bg-[#3a3b3c] border-1 border-white text-white h-40 flex flex-col items-center justify-center mt-10 max-w-[400px] rounded-lg gap-4"
    >
      <h2 class="text-2xl font-semibold">Player X</h2>
      <h2 class="text-2xl font-semibold">
        {{
          selected.length === 8
            ? 'Tie'
            : winner === false
              ? 'Winner'
              : winner === null
                ? ''
                : 'Lose'
        }}
      </h2>
    </div>
    <AppCard class="max-w-md mt-10">
      <div class="w-full grid grid-cols-3 gap-4">
        <div
          v-for="(i, key) in object"
          @click="getIndex(key)"
          :key="key"
          class="h-25 group rounded-lg bg-white w-full flex items-center justify-center cursor-pointer"
        >
          <i
            :key="key"
            :class="[
              'fi text-4xl text-black',
              {
                ' fi-br-circle': i.clicked === true,
              },
              { ' fi-br-cross': i.clicked === false },
              i.clicked === null ? returnIcon : '',
            ]"
          ></i>
        </div>
      </div>
    </AppCard>

    <div
      class="w-full text-5xl bg-[#3a3b3c] border-1 border-white text-white h-40 flex flex-col items-center justify-center mt-10 max-w-[450px] rounded-lg gap-4"
    >
      <h2 class="text-2xl font-semibold">Player O</h2>
      <h2 class="text-2xl font-semibold">
        {{ selected.length === 8 ? 'Tie' : winner ? 'Winner' : winner === null ? '' : 'Lose' }}
      </h2>
      <!-- <p class="float-left w-full text-right">
        {{ selected.length === 9 ? 'Tie' : winner !== null ? 'Winner' : '' }}
      </p>
      <i
        :class="[
          'text-black w-full text-4xl',
          { 'fi-br-circle': winner },
          { 'fi-br-cross': winner === false },
        ]"
      ></i> -->
    </div>
  </div>
</template>
