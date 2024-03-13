<template>
  <v-btn variant="plain" :ripple="false">
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu 
      activator="parent" 
      transition="scroll-y-transition" 
      location="bottom"
    >
      <v-btn
        elevation="0"
        variant="flat"
        :ripple="false"
        height="30"
        @click="copyToClipBoard()"
      >
        リンクをコピー
      </v-btn>
      <v-btn
        v-if="ableToDelete"
        variant="flat"
        elevation="0"
        :ripple="false"
        @click="dialogIsShowed = true" 
        height="30"
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
import { useSnackBarStore } from '@/store/snackbar'
import ConfirmModal from '@/components/ConfirmModal.vue'

const props = defineProps<{
  creatorName: string
  messageId: string
}>()

const { viewRenderKey } = storeToRefs(useRenderKeyStore())
const { myName } = storeToRefs(useLoginStatusStore())
const { snackBar, snackText } = storeToRefs(useSnackBarStore())

const dialogIsShowed = ref<boolean>(false)
const ableToDelete = computed(() => myName.value === props.creatorName)

const toDelete = async () => {
  const res = await fetch(`/api/message/delete/${props.messageId}`, {
      method: "DELETE", 
    })
  if(res.ok){
    snackText.value = 'メッセージを削除しました'
    snackBar.value = true
    viewRenderKey.value++
  }else{
    snackText.value = 'メッセージの削除は失敗しました'
    snackBar.value = true
  }
}

const copyToClipBoard = async () => {
  const text: string = `https://label.trap.show/message/${props.messageId}`
  await navigator.clipboard.writeText(text)
  snackText.value = 'リンクはコピーしました'
  snackBar.value = true
}

</script>