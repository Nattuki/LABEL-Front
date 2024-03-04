<template>
  <v-card v-if="isShowed" :class="$style.form">
    <v-card-text>
      <v-text-field v-model="urlToSend" label="URL" density="comfortable" hide-details></v-text-field>
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn icon="mdi-send" @click="SendMessage" />
    </v-card-actions>
  </v-card>
  <v-btn
    elevation="3"
    icon="mdi-plus"
    @click="isShowed = !isShowed"
    :class="$style.addButton"
    color="black"
  >
  </v-btn>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const isShowed = ref<boolean>(false)
const urlToSend = ref<string>('')

const SendMessage = () => {
  
}

</script>

<style lang="scss" module>
.addButton{
  position: fixed;
  left: 50%;
  bottom:50px;
  transform: translateX(-50%)
             translateY(-50%);
}
.form{
  position: fixed;
  left: 50%;
  bottom:65px;
  transform: translateX(-50%)
             translateY(-50%);
  width:50vw;
}
</style>