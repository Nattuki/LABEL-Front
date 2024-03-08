<template>
  <v-container>
    <v-row 
      style="height:198px;" 
      justify="center" 
      align-content="center"
    >
      <v-card variant="flat" width="350px" class="text-h6 text-left">
       <slot></slot>
      </v-card>
    </v-row>
  </v-container>
</template>