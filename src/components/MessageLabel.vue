<template>
  <v-slide-y-reverse-transition>
    <v-card
      class="mx-3 mb-4"
      color="cyan-lighten-3"
      height="100"
      width="150"
      v-show="isShowed"
    >
      <v-row class="ma-0">
        <v-col class="pa-0" cols="9">
          <v-tooltip :text="creatorName" location="left" >
            <template v-slot:activator="{ props }">
              <user-icon
                v-bind="props" 
                :isBase64="false" 
                :iconSrc="iconUrl" 
                size="23px"
                class="pl-1 pt-1 d-inline-block "
              />
            </template>
          </v-tooltip>
        </v-col>
          <v-col class="pa-0" cols="3">
            <v-btn 
            variant="plain"
            :ripple="false"
            icon="mdi-close" 
            size="30px"
            @click.stop="confirming = true"
            />
          </v-col>
      </v-row>
      <v-card-text class="mx-3 pa-0 text-caption">
        {{ props.content }}
      </v-card-text>
    </v-card>
  </v-slide-y-reverse-transition>
  <v-dialog v-model="confirming" width="500px">
    <label-delete-confirm 
      @toDelete="toDelete()"
      @cancel="confirming = false" 
      :labelId="props.labelId" />
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import LabelDeleteConfirm from '@/components/LabelDeleteConfirm.vue';

const iconUrl = ref<string>('')
const confirming = ref<boolean>(false)
const isShowed = ref<boolean>(false)

const props = defineProps<{
    labelId: string
    messageId: string
    content: string
    creatorName: string
}>()

onMounted(async () => {
    const res = await fetch(`https://q.trap.jp/api/v3/public/icon/${props.creatorName}`)
    const data = await res.blob()
    iconUrl.value = window.URL.createObjectURL(data)
    isShowed.value = true
})

const emit = defineEmits(['toReRender'])

const toDelete = async () => {
    const res = await fetch(`/api/label/delete/${props.labelId}`,{
        method: 'DELETE'
    })
    if(res.ok){
      emit('toReRender')
    }
}

</script>

<style lang="scss" module>


</style>