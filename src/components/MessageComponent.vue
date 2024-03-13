<template>
<v-scroll-x-transition>
  <v-card 
    class="mt-12" 
    elevation="10" 
    :title="props.title"
    v-show="isShowed"
  >
    <template v-slot:prepend>
      <v-tooltip :text="creatorName" location="left">
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" style="padding:4px 0 0 10px;">
            <user-icon :isBase64="false" :iconSrc="iconUrl" size="40px"/>
          </v-avatar>
        </template>
      </v-tooltip>
    </template>
    <template v-slot:append>
      <message-options
        v-if="!disabledOption"
        :creatorName="props.creatorName" 
        :messageId="props.messageId" 
      />
    </template>
    <v-divider  thickness="2" class="mx-3 border-opacity-25"></v-divider>
    <v-container>
      <v-row class="text-center">
        <v-col>
          <message-iframe 
            :url="props.url"
            :timeNow="timeNow"
          />
        </v-col>
        <v-col>
          <message-comment>
            {{ props.comment }}
          </message-comment>
        </v-col>
      </v-row>
      <v-row>
        <message-labels 
          :key="messageRenderKey" 
          :message-id="props.messageId" 
          @toReRender="messageRenderKey++"
          @toSeek="(jumpTime) => timeNow = jumpTime"
        />
      </v-row>
    </v-container>
  </v-card>
</v-scroll-x-transition>
</template>

<script lang="ts" setup>
import MessageIframe from './MessageIframe.vue';
import MessageLabels from './MessageLabels.vue';
import MessageComment from './MessageComment.vue';
import MessageOptions from './MessageOptions.vue';
import UserIcon from './UserIcon.vue';
import { ref, onMounted } from 'vue';



const props = withDefaults(defineProps<{
  messageId: string
  creatorName: string
  title: string
  comment: string
  url: string
  createdOn: string
  disabledOption?: boolean
}>(),{
  disabledOption: false
})

const iconUrl = ref<string>('')
const isShowed = ref<boolean>(false)
const messageRenderKey = ref<number>(0)
const timeNow = ref<number>(0)

onMounted(async () => {
  const res = await fetch(`https://q.trap.jp/api/v3/public/icon/${props.creatorName}`)
  const data = await res.blob()
  iconUrl.value = window.URL.createObjectURL(data)
  isShowed.value = true
})

</script>