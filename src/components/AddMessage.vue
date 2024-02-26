<template>
  <v-card v-if="isShowed">
    <v-card-title>add a message</v-card-title>
    <v-card-text>
      <v-text-field v-model="urlToSend" label="URL"></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn icon="mdi-send" @click="SendMessage"></v-btn>
    </v-card-actions>
  </v-card>
  <v-btn icon="mdi-plus-circle-outline" @click="isShowed = !isShowed"></v-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isShowed = ref<boolean>(false)
const urlToSend = ref<string>('')

const SendMessage = () => {
  
}

</script>