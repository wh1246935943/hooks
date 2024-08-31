import { ref, onMounted, onUnmounted } from 'vue'
import useDebounce from '@/hooks/useDebounce'

export default function useMarqueeInterval (container, delay = 40) {
  let timers = []
  let containerNode = null
  let originalContentHeight = 0
  let resizeObserver = null
  let mutationObserver = null

  const clearIntervals = () => {
    timers.forEach(timer => clearInterval(timer))
    timers = []
  }

  const startAutoScroll = () => {
    if (!checkScrollStatus()) return
    const timer = setInterval(() => {
      if (containerNode) {
        containerNode.scrollTop += 1
        const firstChild = containerNode.firstElementChild

        if (firstChild) {
          // 检查第一个子元素是否完全滚出可视区域
          if (firstChild.getBoundingClientRect().bottom <= containerNode.getBoundingClientRect().top) {
            containerNode.removeChild(firstChild)
          }
        }

        // 检查是否需要克隆新的内容
        const lastChild = containerNode.lastElementChild
        if (lastChild && lastChild.getBoundingClientRect().bottom <= containerNode.getBoundingClientRect().bottom) {
          const newChild = lastChild.cloneNode(true)
          containerNode.appendChild(newChild)
        }
      }
    }, delay)

    clearIntervals()
    timers.push(timer)
  }

  const stopAutoScroll = () => {
    clearIntervals()
  }

  const checkScrollStatus = () => {
    if (containerNode) {
      if (originalContentHeight > containerNode.clientHeight) {
        return true
      } else {
        containerNode.scrollTop = 0
        while (containerNode.children.length > 1) {
          containerNode.removeChild(containerNode.lastElementChild)
        }
        return false
      }
    }
    return false
  }

  const initializeMarquee = () => {
    if (containerNode) {
      const firstChild = containerNode.firstElementChild
      if (firstChild) {
        originalContentHeight = firstChild.scrollHeight
      }

      if (checkScrollStatus()) {
        startAutoScroll()
      } else {
        stopAutoScroll()
      }
    }
  }

  const handleMouseEnter = () => {
    stopAutoScroll()
  }

  const handleMouseLeave = () => {
    startAutoScroll()
  }

  const resetMarquee = (callback) => {
    stop()

    containerNode = null

    callback()

    start()
  }

  function start () {
    containerNode = document.querySelector(container)

    if (containerNode) {
      // 使用 ResizeObserver 监测容器高度变化
      resizeObserver = new ResizeObserver(useDebounce(() => {
        if (checkScrollStatus()) {
          startAutoScroll()
        } else {
          stopAutoScroll()
        }
      }, 300))
      resizeObserver.observe(containerNode)

      mutationObserver = new MutationObserver(useDebounce((mutations, obs) => {
        if (containerNode.children.length > 0) {
          initializeMarquee()
        }
      }, 300))

      mutationObserver.observe(containerNode, { childList: true, subtree: true })

      containerNode.addEventListener('mouseenter', handleMouseEnter)
      containerNode.addEventListener('mouseleave', handleMouseLeave)
    }
  }

  function stop () {
    stopAutoScroll()
    if (resizeObserver) {
      resizeObserver.disconnect()
      resizeObserver = null
    }
    if (mutationObserver) {
      mutationObserver.disconnect()
      mutationObserver = null
    }

    if (containerNode) {
      containerNode.removeEventListener('mouseenter', handleMouseEnter)
      containerNode.removeEventListener('mouseleave', handleMouseLeave)
    }
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return {
    startAutoScroll,
    stopAutoScroll,
    resetMarquee
  }
}
