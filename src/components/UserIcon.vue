<template>
  <div v-if="props.isVisitor">
    <img src="../assets/visitor-icon.png" :class="$style.icon" />
  </div>
  <div v-else>
    <img :src="IconImgSrc" :class="$style.icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    isVisitor?: boolean
    IconBase64?: string
    size?: string
}>(),{
    isVisitor: false,
    IconBase64: '',
    size: '35px'
})

const IconImgSrc = computed(() => 
"data:image/png;base64,"+props.IconBase64)

</script>

<style lang="scss" module>
.icon{
  height: v-bind(size);
  width: v-bind(size);
  border-radius: 50%;
  margin-right:10px;
}
</style>