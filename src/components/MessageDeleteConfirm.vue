<template>
  <v-card>
    <v-card-text class="d-flex justify-center">
      このメッセージを削除しますか
    </v-card-text>
    <v-card-action class="d-flex justify-center">
      <v-btn variant="plain" :ripple="false" @click="cancel()"> いいえ </v-btn>
      <v-btn variant="plain" color="error" :ripple="false" @click="toDelete()">
        はい
      </v-btn>
    </v-card-action>
  </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["cancel", "toDelete"])

const cancel = () => emit("cancel")
const toDelete = () => emit("toDelete")
</script>
