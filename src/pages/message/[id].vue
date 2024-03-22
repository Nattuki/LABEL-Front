<template>
  <message-component
    v-if="isFound"
    :messageId="message.messageId"
    :creatorName="message.creatorName"
    :title="message.title"
    :comment="message.comment"
    :url="message.url"
    :urlType="message.urlType"
    :createdOn="message.createdOn"
    disabledOption
  />
  <not-found v-else />
</template>

<script lang="ts" setup>
import { useLoadingStatusStore } from "@/store/loadingstatus"
import { storeToRefs } from "pinia"
import { ref, Ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import MessageComponent from "@/components/MessageComponent.vue"
import NotFound from "@/components/NotFound.vue"
import type { Message } from "@/types/messages"

const route = useRoute()

const { isLoading } = storeToRefs(useLoadingStatusStore())
const message = ref<Message>() as Ref<Message>
const isFound = ref<boolean>(false)

onMounted(async () => {
  isLoading.value = true
  const res = await fetch(`/api/message/${route.params.id}`)
  if (res.ok) {
    isFound.value = true
    message.value = await res.json()
  } else {
    isFound.value = false
  }
  isLoading.value = false
})
</script>
