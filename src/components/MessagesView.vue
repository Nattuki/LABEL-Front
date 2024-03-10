<template>
  <div v-for="message in messages" :key="message.messageId">
    <message-comment
      :messageId="message.messageId"
      :creatorName="message.creatorName"
      :title="message.title" 
      :comment="message.comment"
      :url="message.url"
      :createdOn="message.createdOn"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { Message } from '@/types/messages';
import MessageComment from '@/components/MessageComponent.vue';

const messages = ref<Message[]>()

const props = defineProps<{
    page: number
}>()

onMounted(async () => {
    const res = await fetch(`/api/message/get/${props.page}`)
    messages.value = await res.json()
})

</script>