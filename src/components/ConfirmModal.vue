<template>
  <v-card>
    <v-card-text class="d-flex justify-center">
      {{ props.text }}
    </v-card-text>
    <v-card-action class="d-flex justify-center">
      <v-btn variant="plain" :ripple="false" @click="cancel()"> いいえ </v-btn>
      <v-btn variant="plain" color="error" :ripple="false" @click="confirm()">
        はい
      </v-btn>
    </v-card-action>
  </v-card>
</template>

<script lang="ts" setup>
const emit = defineEmits(["cancel", "confirm"]);

const props = defineProps<{
  text: string;
}>();

const cancel = () => emit("cancel");
const confirm = () => emit("confirm");
</script>
