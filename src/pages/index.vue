<template>
  <messages-view :key="pageNow" :page="pageNow"/>
  <add-message @is-sent="reRender()"/>
  <div class="text-center" :key="renderKey">
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
import AddMessage from '../components/AddMessage.vue'
import MessagesView from '@/components/MessagesView.vue'
import { ref, onMounted } from 'vue';

const pageNow = ref<number>(1)
const pages = ref<number>(1)
const renderKey = ref<number>(0)



onMounted(async () => {
  const res = await fetch('/api/message/countPages')
  if(res.ok){
    pages.value = (await res.json()).count
  }
})

const reRender = () => {
  pageNow.value = 1
  renderKey.value++
} 

</script>
