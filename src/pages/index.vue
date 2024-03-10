<template>
  <main-view :key="renderKey"/>
  <add-message @is-sent="reRender()"/>
</template>

<script lang="ts" setup>
import AddMessage from '../components/AddMessage.vue'
import MainView from '@/components/MainView.vue';
import { ref } from 'vue';

const renderKey = ref<number>(0)

const reRender = () => {
  renderKey.value++
} 

</script>
