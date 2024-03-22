import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoginStatusStore = defineStore("loginStatus", () => {
  const isVisitor = ref<boolean>(true)
  const myName = ref<string>("")
  const myIconBase64 = ref<string>("")
  return { isVisitor, myName, myIconBase64 }
})
