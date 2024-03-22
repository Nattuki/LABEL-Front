import { ref, computed, onMounted, onUnmounted } from "vue";

export function useWindow() {
  const windowWidth = ref<number>(window.innerWidth);
  const windowHeight = ref<number>(window.innerHeight);
  const isMobile = computed(() => (windowWidth.value <= 480 ? true : false));

  const update = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  onMounted(() => window.addEventListener("resize", update));
  onUnmounted(() => window.removeEventListener("resize", update));

  return { windowWidth, windowHeight, isMobile };
}
