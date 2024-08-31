export default function useBoundaryPosition () {
  const calculatePosition = (clientX, clientY, elementWidth, elementHeight) => {
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // 计算元素的 top 和 left 值
    let top = clientY
    let left = clientX

    // 确保元素不会超出浏览器边界
    if (clientX + elementWidth > windowWidth) {
      left = windowWidth - elementWidth
    }
    if (clientY + elementHeight > windowHeight) {
      top = windowHeight - elementHeight
    }
    if (left < 0) {
      left = 0
    }
    if (top < 0) {
      top = 0
    }

    return { top, left }
  }

  return { calculatePosition }
}
