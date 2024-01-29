<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        >
        </v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        LABEL
      </v-app-bar-title>

      <template v-slot:append>
        <v-btn>
          Sign-In
        </v-btn>

        <v-btn>
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-sheet min-height="20em">
          <label-component />
        </v-sheet>
      </v-container>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import LabelComponent from './components/LabelComponent.vue'

const drawer = ref(false)
</script>