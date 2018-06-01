let devicePixelRatio = window.devicePixelRatio || 1
let canvas = document.createElement('canvas')
let ctx = canvas.getContext('2d')
let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1
export const ratio = devicePixelRatio / backingStoreRatio

export function drawLine(ctx, x1, y1, x2, y2, color) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.stroke()
}

export function drawText(ctx, x, y, text) {
  ctx.beginPath()
  ctx.font = '14px monaco'
  ctx.textAlign = 'center'
  ctx.fillText(text, x ,y)
}

export function drawCircle(ctx, cx, cy, radius) {
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2, true)
  ctx.fill()
}
