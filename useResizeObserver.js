import { ref, onMounted, onUnmounted } from 'vue'

export default function useResizeObserver (callback) {
  const element = ref(null)

  let observer

  const observe = () => {
    if (element.value) {
      observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          callback(entry.contentRect.width)
        }
      })
      observer.observe(element.value)
    }
  }

  onMounted(() => {
    observe()
  })

  onUnmounted(() => {
    if (observer && element.value) {
      observer.unobserve(element.value)
    }
  })

  return {
    element
  }
}
