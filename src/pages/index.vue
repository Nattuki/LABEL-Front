<template>
  <main-view :key="renderKey"/>
  <add-message @is-sent="reRender()"/>
</template>

<script lang="ts" setup>
import AddMessage from '../components/AddMessage.vue'
import MainView from '@/components/MainView.vue';
import { useRenderKeyStore } from '@/store/renderKey';
import { storeToRefs } from 'pinia';

const { renderKey } = storeToRefs(useRenderKeyStore())

const reRender = () => {
  renderKey.value++
} 
</script>
