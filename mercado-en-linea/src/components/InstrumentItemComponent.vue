<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [Number, String],
    required: true,
  },
  isPercentage: Boolean,
  currency: Boolean,
})

const formattedValue = computed(() => {
  if (typeof props.value === 'number' && props.isPercentage === true) {
    if (props.currency) return `$${props.value}`
    if (props.isPercentage) return `${props.value.toFixed(2)}%`
    return props.value.toFixed(2)
  }
  return props.value
})

const textColor = computed(() => {
  if (typeof props.value === 'number' && props.isPercentage === true) {
    if (props.value < 0) return 'text-red-500'
    if (props.value > 0) return 'text-green-500'
  }
  return 'text-white'
})
</script>

<template>
  <td class="px-2 py-1" :class="textColor">
    {{ formattedValue }}
  </td>
</template>
