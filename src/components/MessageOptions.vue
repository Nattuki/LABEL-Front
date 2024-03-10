<template>
  <v-btn variant="plain" :ripple="false" >
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu activator="parent">
      <v-btn @click="toDelete()" :disabled="!ableToDelete">削除</v-btn>
    </v-menu>
  </v-btn>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRenderKeyStore } from '@/store/renderKey';
import { storeToRefs } from 'pinia';
import { useLoginStatusStore } from '@/store/loginStatus';

const props = defineProps<{
  creatorName: string
  messageId: string
}>()

const { renderKey } = storeToRefs(useRenderKeyStore())
const { myName } = storeToRefs(useLoginStatusStore())

const ableToDelete = computed(() => myName.value === props.creatorName)

const toDelete = async () => {
  const res = await fetch(`/api/message/delete/${props.messageId}`, {
      method: "DELETE", 
    });
  if(res.ok){
    renderKey.value++
  }
}

</script>