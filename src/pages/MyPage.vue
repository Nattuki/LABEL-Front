<template>
  <main-view v-if="!isVisitor" :key="viewRenderKey" :userName="myName"/>
  <add-message @is-sent="reRender()"/>
  <v-dialog v-model="pleaseLogin" maxWidth="250px">
    <remind-login-modal @close="jumpToHome()"/>
  </v-dialog>

</template>
  
<script lang="ts" setup>
import AddMessage from '../components/AddMessage.vue'
import MainView from '@/components/MainView.vue'
import RemindLoginModal from '@/components/RemindLoginModal.vue'
import { useLoginStatusStore } from '@/store/loginStatus'
import { useRenderKeyStore } from '@/store/renderKey'
import { storeToRefs } from 'pinia'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
  
const { viewRenderKey } = storeToRefs(useRenderKeyStore())
const { myName, isVisitor } =  storeToRefs(useLoginStatusStore())
 
const router = useRouter()
const pleaseLogin = ref<boolean>(false)

const reRender = () => {
    viewRenderKey.value++
}

onMounted(() => {
    if(isVisitor.value){
        pleaseLogin.value = true
    }
})

const jumpToHome = () => {
    pleaseLogin.value = false
    router.push('/')
}
</script>