<template>
  <v-btn variant="plain" :ripple="false" >
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu activator="parent">
      <v-btn @click="toDelete()">削除</v-btn>
    </v-menu>
  </v-btn>
</template>

<script lang="ts" setup>
import { useRenderKeyStore } from '@/store/renderKey';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  messageId: string
}>()

const { renderKey } = storeToRefs(useRenderKeyStore())

const toDelete = async () => {
  const res = await fetch(`/api/message/delete/${props.messageId}`, {
      method: "DELETE", 
    });
  if(res.ok){
    renderKey.value++
  }
}

</script>