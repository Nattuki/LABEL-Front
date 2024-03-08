<template>
  <v-btn variant="plain" :ripple="false" >
    <v-icon size="x-large">mdi-dots-horizontal</v-icon>
    <v-menu activator="parent">
      <v-btn>削除</v-btn>
    </v-menu>
  </v-btn>
</template>