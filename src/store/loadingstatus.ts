import { defineStore } from "pinia";
import { ref } from "vue";

export const useLoadingStatusStore = defineStore("loadingStatus", () => {
  const isLoading = ref<boolean>(false);
  return { isLoading };
});
