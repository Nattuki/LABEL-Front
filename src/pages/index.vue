<template>
  <message-component/>
</template>

<script lang="ts" setup>
import MessageComponent from '../components/MessageComponent.vue'
import { MessageId } from '@/types/entity-ids';

const messageIds = useGetMessageIds()
</script>
