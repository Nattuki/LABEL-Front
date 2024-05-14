<template>
  <div id="embed-iframe"></div>
  <div id="seek-handler"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useIframeAPIStore } from "@/store/iframeAPI"
import type { EmbedController } from "@/types/SpotifyAPI"
import { storeToRefs } from "pinia"

const props = defineProps<{
  url: string
  width: number
  height: number
}>()

const { iframeAPI } = storeToRefs(useIframeAPIStore())
const timeNow = ref<number>(0)

onMounted(() => {
  const element = document.getElementById("embed-iframe") as Element
  const options = {
    width: props.width,
    height: props.height,
    uri: props.url,
  }
  const callback = (controller: EmbedController) => {
    document.getElementById("seek-handler")!.addEventListener(
      "seek",
      () => {
        controller.seek(timeNow.value)
      },
    )
  }
  iframeAPI.value!.createController(element, options, callback)
})

const seek = new Event("seek")
const seekTo = (timeToSeek: number) => {
  timeNow.value = timeToSeek
  const element = document.getElementById("seek-handler")!
  element.dispatchEvent(seek)
}

defineExpose({
  seekTo,
})
</script>
