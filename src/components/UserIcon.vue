<template>
  <div v-if="props.isVisitor">
    <img src="../assets/visitor-icon.png" :class="$style.icon" />
  </div>
  <div v-else>
    <img :src="props.IconImgSrc" :class="$style.icon" />
  </div>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    isVisitor?: boolean
    IconImgSrc?: string
    size?: string
}>(),{
    isVisitor: false,
    IconImgSrc: '',
    size: '35px'
})

</script>

<style lang="scss" module>
.icon{
  height: v-bind(size);
  width: v-bind(size);
  border-radius: 50%;
  margin-right:10px;
}
</style>