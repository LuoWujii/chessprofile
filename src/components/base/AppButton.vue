<script setup lang="ts">
import type { ButtonSeverity, ButtonSize, ButtonVariant } from '@/types/button'
import { Button } from 'primevue'
import { computed, useSlots } from 'vue'

// Expose the main PrimeVue props you care about
const {
  label = undefined,
  icon = undefined,
  iconPos = 'right',
  variant = undefined,
  href = undefined,
  severity = undefined,
  size = 'small',
  disabled = false,
  loading = false,
  raised = false,
  rounded = false,
  text = false,
  outlined = false,
} = defineProps<{
  label?: string | number
  icon?: string
  href?: string
  variant?: ButtonVariant
  severity?: ButtonSeverity
  size?: ButtonSize

  disabled?: boolean
  loading?: boolean
  iconPos?: 'right' | 'left'
  raised?: boolean
  rounded?: boolean
  text?: boolean
  outlined?: boolean
}>()

const slots = useSlots()

const iconOnly = computed(() => Boolean(!label && !slots.label))
</script>

<template>
  <Button
    :label="label?.toLocaleString()"
    :icon="icon"
    :icon-pos="iconPos"
    :href="href"
    :variant="variant"
    :severity="severity"
    :size="size"
    :disabled="disabled"
    :loading
    :raised="raised"
    :rounded="rounded"
    :text="text"
    :outlined="outlined"
    class="app-button"
    :class="{ '!w-8 !h-8': iconOnly }"
  >
    <template #default>
      <slot v-if="$slots.default">
        <div class="flex items-center whitespace-nowrap leading-[1]">
          <slot name="left-icon">
            <i v-if="icon && iconPos == 'left'" :class="[icon, 'mr-[6px] text-md']" />
          </slot>
          {{ label }}
          <slot name="right-icon">
            <i v-if="icon && iconPos == 'right'" :class="[icon, 'ml-[6px] text-md']" />
          </slot>
        </div>
      </slot>
    </template>
  </Button>
</template>
