<template>
  <div id="embed-iframe"></div>
  <div id="seek-handler"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { EmbedController, IframeAPI } from '@/types/SpotifyAPI'

const props = defineProps<{
    url: string
    width: number
    height: number
}>()

const timeNow = ref<number>(0)

onMounted(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script1.async = true;
    document.body.appendChild(script1);
})

window.onSpotifyIframeApiReady = (API: IframeAPI) => {
    const element = document.getElementById('embed-iframe') as Element
    const options = {
        width: props.width,
        height: props.height,
        uri: props.url,
    }
    const callback = (EmbedController: EmbedController) => {
        (document.getElementById('seek-handler') as Element).addEventListener('seek',()=>{
            EmbedController.seek(timeNow.value)
        })
    };
    API.createController(element, options, callback)
}

const seek = new Event('seek')
const seekTo = (timeToSeek: number) => {
    timeNow.value = timeToSeek
    const element = document.getElementById('seek-handler') as Element
    element.dispatchEvent(seek)
}

defineExpose({
   seekTo
})
</script>