import { defineStore } from "pinia";
import { ref } from "vue";

export const useSnackBarStore = defineStore("snackBar", () => {
  const snackBar = ref<boolean>(false);
  const snackText = ref<string>("");
  return { snackBar, snackText };
});
