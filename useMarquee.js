import { onMounted, onBeforeUnmount } from 'vue'
/**
 * 为指定元素设置滚动
 * @param { CSSSelectorString } key - 设置为全局不重复得选择器，用于正确查找滚动的容器和滚动内容
 * @param { CSSSelectorString } content - 滚动内容的选择器，用于确定哪个内容要滚动
 * @param { CSSSelectorString } container - 滚动容器选择器，滚动的内容要在哪个容器中滚动,如果不传入则为
                                    content的父节点
 * @param { number } speed - 滚动的速度，1为基准，如果想快则设置小于1的数，想慢则设置大于1的数
 * @param { boolean } paused - 鼠标划入滚动容器时，滚动是否要暂停
 */
export default function useMarquee ({
  key = '',
  content = '',
  container = '',
  speed = 1,
  paused = true
}) {
  let containeObserver
  let rollContenObserver
  // 滚动容器的高度
  let containerH = 0
  // 滚动得内容高度
  let rollContentH = 0
  // let timeStampContaine = Date.now()
  // let timeStamprollConten = Date.now()

  const setRollEffect = () => {
    // 获取滚动内容的高度，并拿到滚动的元素节点
    const contentNode = document.querySelector(`${key} ${content}`)
    const { offsetHeight, childNodes } = contentNode
    rollContentH = offsetHeight

    if (container) {
      containerH = document.querySelector(`${key} ${container}`).offsetHeight
    } else {
      containerH = contentNode.parentNode.offsetHeight
    }

    // 当容器高度大于滚动内容的高度时，无需滚动
    if (containerH >= offsetHeight) return

    // 将滚动的内容复制一份插入到末尾
    childNodes.forEach(item => {
      contentNode.append(item.cloneNode(true))
    })

    const nodeKey = key || content

    // 获取所有滚动标识的样式表
    const styleList = document.querySelectorAll('head style[roll-id]')
    styleList.forEach(item => {
      if (item['roll-id'] === nodeKey) item.remove()
    })

    // 创建一个style标签
    const style = document.createElement('style')
    // 创建这个style标签的内容，也就是滚动所需要的动画
    const keyframeName = nodeKey.match(/\w+/g).join('')
    const keyFrames = `
      @keyframes ${keyframeName} {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(0, -${offsetHeight}px, 0);
        }
      }
    `

    // 移动20像素需要1s作为滚动速度的基准,以此计算出这个原始列表滚动完所需要的时间
    const animation = `
      ${key} ${content} {
        animation: ${(offsetHeight / 20) * speed}s ${keyframeName} linear infinite normal;
      }
      ${key} ${content}:hover {
        animation-play-state: ${paused ? 'paused' : 'unset'};
      }
    `

    // 将构造好的动画样式内容赋给style，并将style样式表插入到head中
    // 并给style设置一个roll-id，当key不存在时取content作为roll-id
    style.innerHTML = keyFrames + animation
    style.setAttribute('roll-id', nodeKey)
    style['roll-id'] = nodeKey
    document.getElementsByTagName('head')[0].appendChild(style)
  }

  onMounted(() => {
    setRollEffect()

    // const rollDom = document.querySelector(`${key} ${content}`)
    // let containerDom

    // if (container) {
    //   containerDom = document.querySelector(`${key} ${container}`)
    // } else {
    //   containerDom = rollDom.parentNode
    // }

    // 监听滚动容器高度变化
    // containeObserver = new ResizeObserver(entries => {
    //   const ctime = Date.now()
    //   console.log('111:::', ctime - timeStampContaine)
    //   if (ctime - timeStampContaine < 10000) return
    //   requestAnimationFrame(() => {
    //     for (const entry of entries) {
    //       if (entry.target.offsetHeight !== containerH) {
    //         containerH = entry.target.offsetHeight
    //         timeStampContaine = ctime
    //         // setRollEffect('timeStampContaine', ctime)
    //       }
    //     }
    //   })
    // })
    // containeObserver.observe(containerDom)

    // 监听滚动内容高度变化
    // rollContenObserver = new ResizeObserver(entries => {
    //   const ctime = Date.now()
    //   console.log('222:::', ctime - timeStamprollConten)
    //   if (ctime - timeStamprollConten < 1000) return
    //   requestAnimationFrame(() => {
    //     for (const entry of entries) {
    //       if (entry.target.offsetHeight !== rollContentH) {
    //         rollContentH = entry.target.offsetHeight
    //         timeStamprollConten = ctime
    //         setRollEffect('timeStamprollConten', ctime)
    //       }
    //     }
    //   })
    // })
    // rollContenObserver.observe(rollDom)
  })

  onBeforeUnmount(() => {
    const nodeKey = key || content
    const styleList = document.querySelectorAll('head style[roll-id]')

    styleList.forEach(item => {
      if (item['roll-id'] === nodeKey) item.remove()
    })

    if (containeObserver) containeObserver.disconnect()
    if (rollContenObserver) rollContenObserver.disconnect()
  })

  return { update: setRollEffect }
}
