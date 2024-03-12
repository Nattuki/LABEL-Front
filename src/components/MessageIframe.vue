<template>
  <iframe
    ref="embed" 
    :src="urlSrc"
    width="352" 
    height="198" 
    title="YouTube video player" 
    frameborder="0" 
    allow="clipboard-write; encrypted-media; fullscreen"
  >
  </iframe>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from 'vue'

const props = defineProps<{
  url: string
  timeNow: number
}>()

const embed = ref<HTMLIFrameElement | null>(null)
const urlSrc = computed(() => props.url + "?enablejsapi=1")
const timeToSeek = computed(() => props.timeNow)

watch(timeToSeek, (newTime) => seekTo([newTime]))

const seekTo = (TimeToSeek: number[]) => {
    const TimeToSeekJSON = TimeToSeek !== undefined ? JSON.stringify(TimeToSeek) : '""'
    embed.value?.contentWindow?.postMessage(`{"event":"command","func":"seekTo","args":${TimeToSeekJSON}}`, '*')
}
</script>