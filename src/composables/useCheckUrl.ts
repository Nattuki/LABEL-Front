import { computed } from 'vue'

export const useCheckUrl = (url: string) => {
    const isFormattedUrl = computed(()=>{
        const re = new RegExp('https://www.youtube.com/embed/.*')
        return re.test(url)
    })
    return { isFormattedUrl }
}