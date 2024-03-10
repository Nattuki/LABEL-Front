<template>
  <div :class="$style.form" v-if="isShowed">
    <v-card>
      <v-form 
        ref="messageForm" 
        v-model="isValid" 
        @submit.prevent="sendMessage()">
        <v-card-text class="pb-0">
          <v-text-field
            variant="outlined"
            v-model="titleToSend" 
            label="title" 
            density="comfortable"
            :rules="[rules.required, rules.countTitle]"
            clearable 
          >
          </v-text-field>
          <v-text-field 
            variant="outlined"
            v-model="commentToSend" 
            label="comment" 
            density="comfortable"
            :rules="[rules.required, rules.countComment]"
            clearable 
          >
          </v-text-field>
          <v-text-field
            variant="outlined"
            v-model="urlToSend" 
            label="url"
            density="comfortable" 
            :rules="[rules.required, rules.formatted]"
            clearable
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions class="justify-end pt-0 mt-0">
          <v-btn 
            icon="mdi-send" 
            type="submit"
            variant="plain"
            color="blue"
            :disabled="!isValid"/>
        </v-card-actions>
      </v-form>
    </v-card>
  </div>
  <v-btn
    elevation="3"
    icon="mdi-plus"
    @click="toShowTheForm"
    :class="$style.addButton"
    :disabled="isVisitor"
    color="black"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useLoginStatusStore } from '@/store/loginStatus';
import { storeToRefs } from 'pinia';

const loginStatusStore = useLoginStatusStore()
const { isVisitor } = storeToRefs(loginStatusStore)

const isValid = ref<boolean>(false)
const isShowed = ref<boolean>(false)
const urlToSend = ref<string>('')
const titleToSend = ref<string>('')
const commentToSend = ref<string>('')

const emit = defineEmits(['isSent'])

const toShowTheForm = () => {
  if(!isVisitor.value){
    isShowed.value = !isShowed.value
  }
}

const sendMessage = async () => {
  const data = {
    Title: titleToSend.value,
    Comment: commentToSend.value,
    Url: urlToSend.value
  }
  const res = await fetch('/api/message/send', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(data),
  })
  if(res.ok){
    emit('isSent')
    isShowed.value = false
    clear()
  }
}

const rules = {
  required: (value: string) => !!value || '入力内容が必要',
  countTitle: (value: string) => value.length <= 20 || '文字数制限を超える',
  countComment: (value:string) => value.length <=50 || '文字数制限を超える',
  formatted: (value: string) => new RegExp('^https://www.youtube.com/embed/.+').test(value) || '正しくないurl形式'
}

const clear = () => {
  titleToSend.value = ''
  commentToSend.value = ''
  urlToSend.value = ''
}

</script>

<style lang="scss" module>
.addButton{
  position: fixed;
  left: 50%;
  top:85%;
  transform: translateX(-50%)
             translateY(-50%);
  z-index: 10;
}
.form{
  position: fixed;
  left: 50%;
  top:55%;
  transform: translateX(-50%)
             translateY(-50%);
  width:50vw;
  z-index: 10;
}
</style>