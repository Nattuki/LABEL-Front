<template>
  <div id="embed-iframe"></div>
  <btn id="seekbtn">seek</btn>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import type { EmbedController, IframeAPI } from '@/types/SpotifyAPI'

const props = defineProps<{
    uri: string
}>()

onMounted(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script1.async = true;
    document.body.appendChild(script1);
})

window.onSpotifyIframeApiReady = (API: IframeAPI) => {
    const element = document.getElementById('embed-iframe') as Element;
    const options = {
    uri: 'https://open.spotify.com/intl-ja/track/7iRUZ43lqyaNOZsoUKI0SB'
    };
    const callback = (Controller: EmbedController) => {
        (document.querySelector('#seekbtn') as Element).addEventListener('click',()=>{
            Controller.seek(20)
        })
    };
    API.createController(element, options, callback);
};
</script>