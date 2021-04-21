export function toDate(timestamp) {
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const date = new Date(timestamp)
  return `${shortMonths[date.getMonth()]} ${date.getDate()}`
}

export function isOver(mouse, x, length, DPI_WIDTH) {
  if (!mouse) return false;
  const width = DPI_WIDTH / length;
  return Math.abs(x - mouse.x) < width / 2;
}

export function line(ctx, coords, { color }) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = color;
  for (const [x, y] of coords) {
    ctx.lineTo(x, y);
  }
  ctx.stroke();
  ctx.closePath()
}

export function circle(ctx, [x,y], color, CIRCLE_RADIUS) {
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = '#fff';
  ctx.arc(x, y, CIRCLE_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

export function boundaries({ columns, types }) {
  let min;
  let max;

  columns.forEach(column => {
    if (types[column[0]] !== 'line') return;

    if (typeof min !== 'number') min = column[1];
    if (typeof max !== 'number') max = column[1];

    if (min > column[1]) min = column[1];
    if (max < column[1]) max = column[1];

    for (let i = 2; i < column.length; i++) {
      if (min > column[i]) min = column[i];
      if (max < column[i]) max = column[i];
    }
  })

  return [min, max];
}

export function css(el, styles = {}) {
  Object.assign(el.style, styles);
}