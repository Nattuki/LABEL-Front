<template>
  <main-view :key="viewRenderKey"/>
  <add-message @is-sent="reRender()"/>
</template>

<script lang="ts" setup>
import AddMessage from '../components/AddMessage.vue'
import MainView from '@/components/MainView.vue'
import { useRenderKeyStore } from '@/store/renderKey'
import { storeToRefs } from 'pinia'

const { viewRenderKey } = storeToRefs(useRenderKeyStore())

const reRender = () => {
  viewRenderKey.value++
} 
</script>
