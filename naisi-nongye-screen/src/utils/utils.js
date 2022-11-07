/**
 * 独家完美的
 * 开发模式下适配全屏界面
 */
export const scaleContainer = (selector = '.basic-container') => {
  const _el = document.querySelector(selector);
  const { clientWidth, clientHeight } = _el;
  const { innerWidth, innerHeight } = window;

  let widthScale = innerWidth / clientWidth;
  let heightScale = innerHeight / clientHeight;

  let scale = widthScale;
  if (scale * clientHeight > innerHeight) {
    scale = heightScale;
  }

  window.scale = scale;
  _el.style.transform = `scale(${scale}) translate(-50%, -50%)`;
};
/**
 * 精准的且不会重复加速的定时器
 */
export function poller({
  callback = () => {},
  param = null,
  time = 3000,
}) {
  if (!Array.isArray(window._poller_timers)) {
    window._poller_timers = []
  };

  window._poller_timers.forEach(name => clearTimeout(name));

  const t = setTimeout(() => {
    param ? callback(param) : callback();
  }, time);

  window._poller_timers.push(t);
}
