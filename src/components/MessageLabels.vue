<template>
    <v-slide-group show-arrows>
      <v-slide-group-item
        v-for="n in 10"
        :key="n"
      >
        <v-card
          class="mx-3 mb-4"
          color="grey-lighten-1"
          height="100"
          width="150"
        >
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
</template>