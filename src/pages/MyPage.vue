<template>
    {{ text }}
</template>

<script setup lang="ts">
import { onMounted, ref} from 'vue'

const text = ref<string>('no data')

onMounted(async () => {
    const res = await fetch('/api/me')
    if (res.ok) {
        text.value = await res.text()
    }
})

</script>