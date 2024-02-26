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
        

        <v-btn to="/mypage">
          MyPage
        </v-btn>

        <v-btn @click="moveToOAuth">
          Sign-In
        </v-btn>

        <v-btn to="/">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="HOME" value="home" to="/"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="MYPAGE" value="mypage" to="/mypage"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <v-sheet min-height="20em">
          <router-view />
        </v-sheet>
      </v-container>

    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const drawer = ref(false)

const moveToOAuth = async () => {
  const res = await fetch('/api/loginpath')
  if(res.ok){
    window.location.href = await res.text()
  }
}

</script>