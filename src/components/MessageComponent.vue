<template>
  <v-card>
    <v-card-title>
      こっそりした転調
    </v-card-title>
    <v-divider  thickness="2" class="mx-3 border-opacity-25"></v-divider>
    <v-container>
      <v-row class="text-center">
        <v-col>
          <message-iframe />
        </v-col>
        <v-col>
          sedw
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

</script>