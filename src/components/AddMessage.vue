<template>
  <v-card v-if="isShowed" :class="$style.form">
    <v-form 
      ref="messageForm" 
      v-model="isValid" 
      @submit.prevent="sendMessage()">
      <v-card-text>
        <v-text-field 
          v-model="titleToSend" 
          label="title" 
          density="comfortable"
          :rules="[rules.required, rules.count]"
          clearable 
        >
        </v-text-field>
        <v-text-field 
          v-model="urlToSend" 
          label="url"
          density="comfortable" 
          :rules="[rules.required, rules.formatted]"
          clearable
        >
        </v-text-field>
        {{ text }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn 
          icon="mdi-send" 
          type="submit"
          variant="plain"
          color="blue"
          :disabled="!isValid"/>
      </v-card-actions>
    </v-form>
  </v-card>
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
const text = ref<string>('none')


const toShowTheForm = () => {
  if(!isVisitor.value){
    isShowed.value = !isShowed.value
  }
}

const sendMessage = async () => {
  const data = {
    Title: titleToSend.value,
    Url: urlToSend.value
  }
  const res = await fetch('/api/message', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify(data),
  })
  if(res.ok){
    text.value = await res.text()
  }
}

const rules = {
  required: (value: string) => !!value || '入力内容が必要',
  count: (value: string) => value.length <= 20 || '文字数制限を超える',
  formatted: (value: string) => new RegExp('^https://www.youtube.com/embed/.+').test(value) || '正しくないurl形式'
}

</script>

<style lang="scss" module>
.addButton{
  position: fixed;
  left: 50%;
  top:85%;
  transform: translateX(-50%)
             translateY(-50%);
}
.form{
  position: fixed;
  left: 50%;
  top:60%;
  transform: translateX(-50%)
             translateY(-50%);
  width:50vw;
}
</style>