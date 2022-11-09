export const drawDian = (selector, container) => {
  const canvas = document.querySelector(selector);

  const ctx = canvas.getContext("2d");

  const {clientWidth: width, clientHeight: height} = document.querySelector(container);

  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  canvas.style.background = '#00000000';

  const snows = Array.from({length: 200}, () => {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 1.5
    }
  });


  function render() {

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    
    snows.forEach(item => {
      item.y = item.y > height ? 0 : (item.y + item.speed);

      item.x = item.x > width ? 0 : (item.x + Math.random() * 1);

      ctx.fillStyle = `rgb(255 255 255 / 50%)`

      ctx.strokeStyle = '#00000000'
      ctx.rect(item.x, item.y, 3, 3);
      
      ctx.stroke();
    });

    ctx.fill()

    requestAnimationFrame(render)
  };

  render();
}