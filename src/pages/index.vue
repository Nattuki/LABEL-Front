<template>
  <message-component title="タイトルは20字以内" comment="一言コメントなのでここの字数制限は50字以内にする"/>
  <message-component title="タイトル2" comment="Comment 2です"/>
  <message-component title="Title3" comment="Comment 3です"/>
  <add-message />
</template>

<script lang="ts" setup>
import MessageComponent from '../components/MessageComponent.vue'
import AddMessage from '../components/AddMessage.vue'


</script>
