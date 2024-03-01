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
        


        <button to="/mypage">
          <img :src="MyIconImgSrc" :class="$style.myicon" />
        </button>

        <v-btn @click="moveToOAuth" v-if="isVisitor">
          LogIn
        </v-btn>
        <v-btn @click="logOut" v-if="!isVisitor">
          LogOut
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
import { ref, onMounted, computed } from 'vue'

const drawer = ref<boolean>(false)
const isVisitor = ref<boolean>(false)
const myIconBase64 = ref<string>('')

onMounted(async () => {
  const res = await fetch('/api/getme')
  if(res.ok){
    const myInformation = await res.json()
    myIconBase64.value = await myInformation.MyIconBase64
  }
})

const moveToOAuth = async () => {
  const res = await fetch('/api/loginpath')
  if(res.ok){
    window.location.href = await res.text()
  }
}

const logOut = async () => {
  const res = await fetch('/api/logout')
  if(res.ok){
    isVisitor.value = true
  }
}

const MyIconImgSrc = computed(() => "data:image/png;base64,"+myIconBase64.value)

</script>

<style lang="scss" module>
.myicon{
  height:35px;
  width:35px;
  border-radius: 50%;
}

</style>