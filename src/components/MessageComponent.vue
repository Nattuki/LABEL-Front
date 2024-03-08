<template>
  <v-card class="my-12" elevation="10">
    <v-row>
      <v-col cols="6">
        <v-card-title class="font-weight-bold">
          <v-icon size="small">mdi-home</v-icon>
          こっそりした転調
        </v-card-title>
      </v-col>
      <v-col cols="6" class="text-end pt-5">
        <message-options />
      </v-col>
    </v-row>
    <v-divider  thickness="2" class="mx-3 border-opacity-25"></v-divider>
    <v-container>
      <v-row class="text-center">
        <v-col>
          <message-iframe />
        </v-col>
        <v-col>
          <message-comment />
        </v-col>
      </v-row>
      <v-row>
        <message-labels />
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" setup>
import MessageIframe from './MessageIframe.vue';
import MessageLabels from './MessageLabels.vue';
import MessageComment from './MessageComment.vue';
import MessageOptions from './MessageOptions.vue';

</script>