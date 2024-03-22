<template>
  <v-app>
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon
          variant="plain"
          @click.stop="drawer = !drawer"
          :ripple="false"
        >
        </v-app-bar-nav-icon>
        <img src="./assets/icon.svg" width="50px" height="50px" />
        <div v-if="!isMobile">
          <v-btn to="/" :ripple="false" variant="plain"> HOME </v-btn>
          <v-btn to="/mypage" :ripple="false" variant="plain"> mypage </v-btn>
        </div>
      </template>
      <template v-slot:append>
        <v-btn @click="dialogIsShowed = true" v-if="isVisitor">
          <user-icon isVisitor />
          LogIn
          <v-dialog v-model="dialogIsShowed" maxWidth="250px">
            <confirm-modal
              @confirm="moveToOAuth()"
              @cancel="dialogIsShowed = false"
              :text="'ログインしますか'"
            />
          </v-dialog>
        </v-btn>
        <v-btn @click="dialogIsShowed = true" v-else>
          <user-icon :iconSrc="myIconBase64" />
          LogOut
          <v-dialog v-model="dialogIsShowed" maxWidth="250px">
            <confirm-modal
              @confirm="logOut()"
              @cancel="dialogIsShowed = false"
              :text="'ログアウトしますか'"
            />
          </v-dialog>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list nav>
        <v-list-item
          prepend-icon="mdi-home"
          title="HOME"
          value="home"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account"
          title="MYPAGE"
          value="mypage"
          to="/mypage"
        ></v-list-item>
      </v-list>
      <template v-slot:append>
        <v-container class="d-flex align-center">
          <img
            src="./assets/icon.svg"
            width="40px"
            height="40px"
            class="mr-3"
          />
          LABEL 1.1
        </v-container>
      </template>
    </v-navigation-drawer>

    <v-main>
      <v-snackbar v-model="snackBar" :timeout="1500" location="bottom">
        {{ snackText }}
      </v-snackbar>
      <v-progress-linear indeterminate v-if="isLoading"></v-progress-linear>
      <v-container>
        <v-sheet min-height="20em">
          <v-btn
            variant="plain"
            :ripple="false"
            :class="$style.reload"
            @click="renderKey++"
          >
            <v-icon size="30px">mdi-reload</v-icon>
          </v-btn>
          <router-view :key="renderKey" />
        </v-sheet>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue"
import { useLoginStatusStore } from "./store/loginStatus"
import { useLoadingStatusStore } from "./store/loadingstatus"
import { useSnackBarStore } from "./store/snackbar"
import { useIframeAPIStore } from "./store/iframeAPI"
import { storeToRefs } from "pinia"
import { useWindow } from "./composables/useWindow"
import type { IframeAPI } from "./types/SpotifyAPI"
import ConfirmModal from "@/components/ConfirmModal.vue"
import UserIcon from "@/components/UserIcon.vue"

const IframeAPIStore = useIframeAPIStore()
const { isVisitor, myIconBase64 } = storeToRefs(useLoginStatusStore())
const { isLoading } = storeToRefs(useLoadingStatusStore())
const { snackBar, snackText } = storeToRefs(useSnackBarStore())
const { isMobile } = useWindow()

const drawer = ref<boolean>(false)
const dialogIsShowed = ref<boolean>(false)
const renderKey = ref<number>(0)

const moveToOAuth = async () => {
  const res = await fetch("/api/loginpath")
  if (res.ok) {
    window.location.href = await res.text()
  }
}

const logOut = async () => {
  const res = await fetch("/api/logout", { method: "DELETE" })
  if (res.ok) {
    window.location.reload()
  }
}

onMounted(() => {
  const spotifyAPIScript = document.createElement("script")
  spotifyAPIScript.src = "https://open.spotify.com/embed/iframe-api/v1"
  spotifyAPIScript.async = true
  document.body.appendChild(spotifyAPIScript)

  window.onSpotifyIframeApiReady = (API: IframeAPI) => {
    IframeAPIStore.getIframeAPI(API)
  }
})
</script>

<style lang="scss" module>
.reload {
  position: absolute;
  top: 80px;
  right: 50px;
  z-index: 10;
}
</style>
