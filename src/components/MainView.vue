<template>
  <messages-view :key="pageNow" :page="pageNow" :userName="userName" />
  <div class="text-center" :key="pageNow">
    <v-container class="mt-4 pa-0">
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="pageNow"
              :length="pages"
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts" setup>
import MessagesView from './MessagesView.vue'
import { ref, onMounted, watch } from 'vue'
import { useSnackBarStore } from '@/store/snackbar'
import { storeToRefs } from 'pinia';

const props = withDefaults(defineProps<{
    userName?: string
}>(),{
    userName: ''
})

const { snackBar, snackText } = storeToRefs(useSnackBarStore())

const pageNow = ref<number>(1)
const pages = ref<number>(1)

onMounted(() => {
  updatePages()
  snackText.value = '最新の情報を取得しました'
  snackBar.value = true
})
watch(pageNow, () => updatePages())

const updatePages = async () => {
  const res = await fetch(`/api/message/countPages?name=${props.userName}`)
  if(res.ok){
    pages.value = (await res.json()).count
  }
}

</script>