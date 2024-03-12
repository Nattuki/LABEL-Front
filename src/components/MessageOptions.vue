<template>
  <v-btn variant="plain" :ripple="false" >
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu activator="parent">
      <v-btn 
        @click="dialogIsShowed = true" 
        :disabled="!ableToDelete"
      >
        削除
      </v-btn>
    </v-menu>
    <v-dialog v-model="dialogIsShowed" maxWidth="300px">
      <confirm-modal
        @confirm="toDelete()" 
        @cancel="dialogIsShowed=false"
        :text="'このメッセージを削除しますか'"
      />
    </v-dialog>
  </v-btn>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRenderKeyStore } from '@/store/renderKey'
import { storeToRefs } from 'pinia'
import { useLoginStatusStore } from '@/store/loginStatus'
import ConfirmModal from '@/components/ConfirmModal.vue'

const props = defineProps<{
  creatorName: string
  messageId: string
}>()

const { viewRenderKey } = storeToRefs(useRenderKeyStore())
const { myName } = storeToRefs(useLoginStatusStore())

const dialogIsShowed = ref<boolean>(false)
const ableToDelete = computed(() => myName.value === props.creatorName)

const toDelete = async () => {
  const res = await fetch(`/api/message/delete/${props.messageId}`, {
      method: "DELETE", 
    })
  if(res.ok){
    viewRenderKey.value++
  }
}

</script>