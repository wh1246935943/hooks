/**
 * useDebounce Hook
 * @param {Function} func - 需要防抖处理的函数
 * @param {number} wait - 等待时间（毫秒）
 * @returns {Function} - 经过防抖处理后的函数
 */
export default function useDebounce (func, wait) {
  let timeout = null

  const debouncedFunc = (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }

  return debouncedFunc
}
