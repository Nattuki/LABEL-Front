import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRenderKeyStore = defineStore('renderKey', () => {
    const renderKey = ref<number>(0)
    return { renderKey }
})