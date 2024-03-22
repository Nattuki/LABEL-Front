import { defineStore } from "pinia";
import { ref } from "vue";

export const useRenderKeyStore = defineStore("renderKey", () => {
  const viewRenderKey = ref<number>(0);
  const messageRenderKey = ref<number>(0);
  return { viewRenderKey, messageRenderKey };
});
