<template>
  <iframe
    ref="embed"
    :src="urlSrc"
    :width="props.width"
    :height="props.height"
    title="YouTube video player"
    frameborder="0"
    allow="clipboard-write; encrypted-media; fullscreen"
  >
  </iframe>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue"

const props = defineProps<{
  url: string
  width: number
  height: number
}>()

const embed = ref<HTMLIFrameElement | null>(null)
const urlSrc = computed(() => {
  return convertToEmbedUrl(props.url) + "?enablejsapi=1"
})

const seekTo = (timeToSeek: number) => {
  const timeToSeekArray: number[] = [timeToSeek]
  const timeToSeekJSON = JSON.stringify(timeToSeekArray)
  embed.value?.contentWindow?.postMessage(
    `{"event":"command","func":"seekTo","args":${timeToSeekJSON}}`,
    "*",
  )
}

const convertToEmbedUrl = (url: string) => {
  const s = url.substring(32)
  return "https://www.youtube.com/embed/" + s
}

defineExpose({
  seekTo,
})
</script>
