<template>
  <iframe 
    ref="embed" 
    :src="props.url"
    width="352" 
    height="198" 
    title="YouTube video player" 
    frameborder="0" 
    allow="clipboard-write; encrypted-media"
  >
  </iframe>
</template>

<script lang="ts" setup>
const props = defineProps<{
  url: string
}>()
</script>