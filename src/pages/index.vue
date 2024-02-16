<template>
  <template v-for= "messageId in messageIds" :key="messageId">
    <message-component :message-id="messageId"/>
  </template>
  <add-message />
</template>

<script lang="ts" setup>
import MessageComponent from '../components/MessageComponent.vue'
import AddMessage from '../components/AddMessage.vue'
import { MessageId } from '@/types/entity-ids';


const { messageIds } = useGetMessageIds()
</script>
