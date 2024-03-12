<template>
  <v-slide-group show-arrows>
    <v-slide-group-item
      v-for="label in labels"
      :key="label.labelId"
    >
      <message-label 
        :labelId="label.labelId"
        :messageId="label.messageId"
        :content="label.content"
        :creatorName="label.creatorName"
        :jumpTime="label.jumpTime"
        @toReRender="toReRender()"
        @toSeek="(jumpTime) => toSeek(jumpTime)"
      />
    </v-slide-group-item>
      <v-card
        class="mx-3 mb-4"
        color="grey-lighten-1"
        height="100"
        width="150"
        @click="dialogIsShowed = true"
      >
        <div class="d-flex fill-height align-center justify-center">
          <v-icon icon="mdi-plus-circle-outline" color="white" size="48"/>
        </div>
      </v-card>
  </v-slide-group>
  <v-dialog v-model="dialogIsShowed" maxWidth="500px" persistent>
    <add-label @toReRender="toReRender()" @cancel="dialogIsShowed = false" :messageId="props.messageId" />
  </v-dialog>
</template>

<script lang="ts" setup>
import MessageLabel from '@/components/MessageLabel.vue'
import AddLabel from '@/components/AddLabel.vue'
import { ref, onMounted } from 'vue';
import type { Label } from '@/types/messages';

const labels = ref<Label[]>()

const props = defineProps<{
    messageId: string
}>()

const dialogIsShowed = ref<boolean>(false)

onMounted(async () => {
    const res = await fetch(`/api/label/get/${props.messageId}`)
    labels.value = await res.json()
})

const emit = defineEmits(['toReRender', 'toSeek'])
const toReRender = () => emit('toReRender')
const toSeek = (jumpTime: number) => emit('toSeek', jumpTime)

</script>