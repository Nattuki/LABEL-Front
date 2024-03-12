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

        <v-app-bar-title>
        LABEL
        </v-app-bar-title>
        
        <v-btn to="/" :ripple="false" variant="text">
          <v-icon>
            mdi-home
          </v-icon>
        </v-btn>

        <v-btn to="/mypage" :ripple="false" variant="text">
          mypage
        </v-btn>
      </template>

      <template v-slot:append>
        <v-btn @click="dialogIsShowed=true" v-if="isVisitor">
          <user-icon isVisitor />
          LogIn
          <v-dialog v-model="dialogIsShowed" maxWidth="250px">
            <confirm-modal 
              @confirm="moveToOAuth()" 
              @cancel="dialogIsShowed=false"
              :text="'ログインしますか'"
            />
          </v-dialog>
        </v-btn>
        <v-btn @click="dialogIsShowed=true" v-else>
          <user-icon :iconSrc="myIconBase64" />
          LogOut
          <v-dialog v-model="dialogIsShowed" maxWidth="250px">
            <confirm-modal 
              @confirm="logOut()" 
              @cancel="dialogIsShowed=false"
              :text="'ログアウトしますか'"
            />
          </v-dialog>          
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
      <v-progress-linear indeterminate v-if="isLoading"></v-progress-linear>
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
import { useLoginStatusStore } from './store/loginStatus'
import { useLoadingStatusStore } from './store/loadingstatus'
import { storeToRefs } from 'pinia'
import ConfirmModal from '@/components/ConfirmModal.vue'
import UserIcon from '@/components/UserIcon.vue'

const { isVisitor, myIconBase64 } = storeToRefs(useLoginStatusStore())
const { isLoading } = storeToRefs(useLoadingStatusStore())

const drawer = ref<boolean>(false)
const dialogIsShowed = ref<boolean>(false)

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