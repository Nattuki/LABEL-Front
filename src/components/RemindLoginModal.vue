<template>
  <v-card>
    <v-card-text class="d-flex justify-center">
      ログインしてください
    </v-card-text>
    <v-card-action class="d-flex justify-center">
      <v-btn variant="plain" color="blue" :ripple="false" @click="close()">
        閉じる
      </v-btn>
    </v-card-action>
  </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["close"]);
const close = () => emit("close");
</script>
