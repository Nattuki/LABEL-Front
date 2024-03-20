<template>
  <div v-for="message in messages" :key="message.messageId">
    <message-component
      :messageId="message.messageId"
      :creatorName="message.creatorName"
      :title="message.title" 
      :comment="message.comment"
      :url="message.url"
      :urlType="message.urlType"
      :createdOn="message.createdOn"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import type { Message } from '@/types/messages'
import { useLoadingStatusStore } from '@/store/loadingstatus'
import { storeToRefs } from 'pinia'
import MessageComponent from '@/components/MessageComponent.vue'

const { isLoading } = storeToRefs(useLoadingStatusStore())
const messages = ref<Message[]>()

const props = withDefaults(defineProps<{
    page: number
    userName?: string
}>(),{
    userName: ''
})

onMounted(async () => {
    isLoading.value = true
    const res = await fetch(`/api/message/get/${props.page}?name=${props.userName}`)
    isLoading.value = false
    if(res.ok){
      messages.value = await res.json()
    }
})

</script>