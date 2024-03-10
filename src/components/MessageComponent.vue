<template>
  <v-card 
    class="mt-12" 
    elevation="10" 
    :title="props.title"
  >
    <template v-slot:prepend>
      <v-avatar style="padding:4px 0 0 10px;">
        <user-icon :IconBase64="myIconBase64" size="40px"/>
      </v-avatar>
    </template>
    <template v-slot:append>
      <message-options :creatorName="props.creatorName" :messageId="props.messageId" />
    </template>
    <v-divider  thickness="2" class="mx-3 border-opacity-25"></v-divider>
    <v-container>
      <v-row class="text-center">
        <v-col>
          <message-iframe :url="props.url"/>
        </v-col>
        <v-col>
          <message-comment>
            {{ props.comment }}
          </message-comment>
        </v-col>
      </v-row>
      <v-row>
        <message-labels />
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import MessageIframe from './MessageIframe.vue';
import MessageLabels from './MessageLabels.vue';
import MessageComment from './MessageComment.vue';
import MessageOptions from './MessageOptions.vue';
import UserIcon from './UserIcon.vue';
import { useLoginStatusStore } from '@/store/loginStatus';
import { storeToRefs } from 'pinia';

const props = defineProps<{
  messageId: string
  creatorName: string
  title: string
  comment: string
  url: string
  createdOn: string
}>()

const { myIconBase64 } = storeToRefs(useLoginStatusStore())

</script>