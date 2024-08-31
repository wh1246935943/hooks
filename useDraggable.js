import { ref, onMounted, onUnmounted } from 'vue'

export default function useDraggable (limits = {}, draggableExcludeSelector = null) {
  const isDown = ref(false)
  const offsetX = ref(0)
  const offsetY = ref(0)
  const elementRef = ref(null)

  const onMouseMove = (e) => {
    if (isDown.value && elementRef.value) {
      let newLeft = e.clientX - offsetX.value
      let newTop = e.clientY - offsetY.value

      const windowWidth = window.innerWidth
      const windowHeight = window.innerHeight

      if (limits.left !== undefined && newLeft < limits.left) {
        newLeft = limits.left
      }
      if (limits.right !== undefined && newLeft + elementRef.value.offsetWidth > windowWidth - limits.right) {
        newLeft = windowWidth - limits.right - elementRef.value.offsetWidth
      }
      if (limits.top !== undefined && newTop < limits.top) {
        newTop = limits.top
      }
      if (limits.bottom !== undefined && newTop + elementRef.value.offsetHeight > windowHeight - limits.bottom) {
        newTop = windowHeight - limits.bottom - elementRef.value.offsetHeight
      }

      elementRef.value.style.left = newLeft + 'px'
      elementRef.value.style.top = newTop + 'px'
      elementRef.value.style.bottom = 'auto'
      elementRef.value.style.right = 'auto'
    }
  }

  const onMouseDown = (e) => {
    if (elementRef.value) {
      // 检查事件目标是否匹配不能拖拽的元素选择器
      if (draggableExcludeSelector && typeof draggableExcludeSelector === 'string' && e.target.closest(draggableExcludeSelector)) {
        return
      }

      e.preventDefault()
      isDown.value = true
      offsetX.value = e.clientX - elementRef.value.getBoundingClientRect().left
      offsetY.value = e.clientY - elementRef.value.getBoundingClientRect().top
      elementRef.value.style.position = 'absolute'
    }
  }

  const onMouseUp = () => {
    isDown.value = false
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  })

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  })

  return {
    elementRef,
    onMouseDown
  }
}
