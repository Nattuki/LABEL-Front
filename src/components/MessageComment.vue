<template>
  <v-sheet :height="height" class="d-flex justify-center align-center px-6">
    <v-card variant="flat" width="350px" class="text-h6 text-left">
      <slot></slot>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useWindow } from "@/composables/useWindow"

const { isMobile } = useWindow()
const height = computed(() => (isMobile.value ? 160 : 198))
</script>
