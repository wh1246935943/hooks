export function counter({
  startValue = 0,
  maxValue,
  speed = 80,
  countSize = 1,
  index,
  callBack = () => {}
} = {}) {

  setTimeout(() => {
    // callBack(startValue, index);
    function loop(value) {

      const isCritical = value >= maxValue

      setTimeout(() => {

        callBack(isCritical ? maxValue : value, index);

        if (isCritical) return;

        loop(value + countSize);

      }, speed)
    };
    
    loop(startValue)
  }, 0)

}