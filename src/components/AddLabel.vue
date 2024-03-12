<template>
  <v-card  class="pa-3">
    <v-card-title>
      ラベルを作成します
    </v-card-title>
    <v-form
      ref="labelForm"
      v-model="isValid"
      @submit.prevent="sendLabel()"
    >
      <v-card-text class="pb-0">
        <v-textarea
          rows="2"
          variant="outlined"
          v-model="contentToSend"
          label="comment"
          density="comfortable"
          :rules="[rules.requiredText,rules.countComment]"
        ></v-textarea>
      </v-card-text>
      <v-row class="px-4">
        <v-col cols="4">
          <v-text-field
            variant="outlined"
            v-model.number="hourToSend"
            label="hour"
            density="comfortable"
            :rules="[rules.validNumber]"
           ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            variant="outlined"
            v-model.number="minuteToSend"
            label="minute"
            density="comfortable"
            :rules="[rules.validNumber]"
          ></v-text-field>
        </v-col>
        <v-col>
          <v-text-field
            variant="outlined"
            v-model.number="secondToSend"
            label="second"
            density="comfortable"
            :rules="[rules.validNumber]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-radio-group inline class="mx-1" v-model="labelColor">
        <v-radio :ripple="false" value="cyan-lighten-3" color="cyan-lighten-1" base-color="cyan-lighten-1">
          <template v-slot:label>
            <strong>Color 1</strong>
          </template>
        </v-radio>
        <v-radio :ripple="false" value="pink-accent-1" color="pink-accent-1" base-color="pink-accent-1">
          <template v-slot:label>
            <strong>Color 2</strong>
          </template>
        </v-radio>
        <v-radio :ripple="false" value="light-green-accent-1" color="light-green-accent-1" base-color="light-green-accent-1">
          <template v-slot:label>
            <strong >Color 3</strong>
          </template>
        </v-radio>
      </v-radio-group>
      <v-card-actions class="justify-end pt-0">
        <v-btn
          variant="plain"
          :ripple="false"
          @click="cancel()"
        >
          CANCEL
        </v-btn>
        <v-btn 
          icon="mdi-send"
          type="submit"
          variant="plain"
          :ripple="false"
          color="blue"
          :disabled="!isValid"
        ></v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useLoadingStatusStore } from '@/store/loadingstatus'
import { storeToRefs } from 'pinia'

const { isLoading } = storeToRefs(useLoadingStatusStore())
const isValid = ref<boolean>(false)
const contentToSend = ref<string>()
const hourToSend =ref<number>(0)
const minuteToSend = ref<number>(0)
const secondToSend = ref<number>(0)
const labelColor = ref<string>('cyan-lighten-3')

const timeToSend = computed(() => 
    hourToSend.value*3600 + minuteToSend.value*60 + secondToSend.value*1
)

const props = defineProps<{
    messageId: string
}>()

const emit = defineEmits(['cancel', 'toReRender'])

const cancel = () => emit('cancel')

const rules = {
    requiredText: (value: string) => !!value || '入力内容が必要です',
    validNumber: (value: number) =>  !isNaN(value) && value>=0 || '無効な数字です',
    countComment: (value:string) => value.length <=30 || '文字数制限を超えます',
}

const sendLabel = async () => {
  isLoading.value = true
  const data = {
    messageId: props.messageId,
    content: contentToSend.value,
    jumpTime: timeToSend.value,
    labelColor: labelColor.value
  }
  const res = await fetch('/api/label/send', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(data),
  })
  if(res.ok){
    emit('toReRender')
    isLoading.value = false
  }
}
</script>