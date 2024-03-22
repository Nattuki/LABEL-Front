import { defineStore } from "pinia";
import { ref } from "vue";
import type { IframeAPI } from "@/types/SpotifyAPI";

export const useIframeAPIStore = defineStore("iframeAPI", () => {
  const iframeAPI = ref();

  const getIframeAPI = (API: IframeAPI) => {
    iframeAPI.value = API;
  };

  return { iframeAPI, getIframeAPI };
});
