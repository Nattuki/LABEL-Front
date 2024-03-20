<template>
  <iframe
    ref="embed" 
    :src="urlSrc"
    :width="iFrameWidth" 
    :height="iFrameHeight" 
    title="YouTube video player" 
    frameborder="0" 
    allow="clipboard-write; encrypted-media; fullscreen"
  >
  </iframe>
</template>

<script lang="ts" setup>
import { useWindow } from '@/composables/useWindow';
import { ref, computed } from 'vue'

const props = defineProps<{
  url: string
  timeNow: number
}>()


const { isMobile } = useWindow()

const embed = ref<HTMLIFrameElement | null>(null)
const urlSrc = computed(() => props.url + "?enablejsapi=1")
const iFrameWidth = computed(() => isMobile.value ? 288 : 352)
const iFrameHeight = computed(() => isMobile.value ? 162 : 198)

const seekTo = (TimeToSeek: number) => {
    const TimeToSeekJSON = JSON.stringify(TimeToSeek)
    embed.value?.contentWindow?.postMessage(`{"event":"command","func":"seekTo","args":${TimeToSeekJSON}}`, '*')
}

defineExpose({
    seekTo
})
</script>