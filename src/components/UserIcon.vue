<template>
  <div v-if="props.isVisitor">
    <img src="../assets/visitor-icon.png" :class="$style.icon" />
  </div>
  <div v-else>
    <img :src="iconSrc" :class="$style.icon" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    isVisitor?: boolean;
    isBase64?: boolean;
    iconSrc?: string;
    size?: string;
  }>(),
  {
    isVisitor: false,
    isBase64: true,
    iconSrc: "",
    size: "35px",
  },
);

const iconSrc = computed(() => {
  if (props.isBase64) {
    return "data:image/png;base64," + props.iconSrc;
  } else {
    return props.iconSrc;
  }
});
</script>

<style lang="scss" module>
.icon {
  height: v-bind(size);
  width: v-bind(size);
  border-radius: 50%;
  margin-right: 10px;
}
</style>
