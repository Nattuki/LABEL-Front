<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="text"
          @click.stop="drawer = !drawer"
        >
        </v-app-bar-nav-icon>

        <v-app-bar-title>
        LABEL
        </v-app-bar-title>
        
        <v-btn to="/">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>

        <v-btn to="/mypage">
          mypage
        </v-btn>
      </template>

      <template v-slot:append>
        <v-btn @click="moveToOAuth" v-if="isVisitor">
          <img src="./assets/visitor-icon.png" :class="$style.myicon" />
          LogIn
        </v-btn>
        <v-btn @click="logOut" v-if="!isVisitor">
          <img :src="MyIconImgSrc" :class="$style.myicon" />
          LogOut
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item prepend-icon="mdi-home" title="HOME" value="home" to="/"></v-list-item>
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
import { ref, computed } from 'vue'
import { useLoginStatusStore } from './store/loginStatus';
import { storeToRefs } from 'pinia';

const loginStatusStore = useLoginStatusStore()
const { isVisitor, myIconBase64 } = storeToRefs(loginStatusStore)

const drawer = ref<boolean>(false)
const MyIconImgSrc = computed(() => "data:image/png;base64,"+myIconBase64.value)

const moveToOAuth = async () => {
  const res = await fetch('/api/loginpath')
  if(res.ok){
    window.location.href = await res.text()
  }
}

const logOut = async () => {
  const res = await fetch('/api/logout',{method:'DELETE'})
  if(res.ok){
    window.location.reload()
  }
}

</script>

<style lang="scss" module>
.myicon{
  height:35px;
  width:35px;
  border-radius: 50%;
  margin-right:10px;
}

</style>