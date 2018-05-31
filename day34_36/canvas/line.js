function drawLineChart(options) {

  let canvas = document.getElementById('canvas')
  let ctx = canvas.getContext('2d')

  var devicePixelRatio = window.devicePixelRatio || 1
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                          ctx.mozBackingStorePixelRatio ||
                          ctx.msBackingStorePixelRatio ||
                          ctx.oBackingStorePixelRatio ||
                          ctx.backingStorePixelRatio || 1
  var ratio = devicePixelRatio / backingStoreRatio

  let { xAxisData, yAxisData } = options

  let canvasW = document.documentElement.clientWidth
  let canvasH = document.documentElement.clientHeight
  let canvasPadding = 60
  let xAxisLength = canvasW - 2 * canvasPadding
  let yAxisLength = canvasH - 2 * canvasPadding
  let xAxisX1 = canvasPadding
  let xAxisX2 = canvasPadding + xAxisLength
  let xAxisY1 = canvasH - canvasPadding
  let yAxisX1 = canvasPadding
  let yAxisY1 = canvasPadding
  let yAxisY2 = canvasH - canvasPadding

  let axisColor = '#ccc'
  let barColor = '#83bff6'
  let textColor = 'black'

  let maxData = Math.max.apply(null, yAxisData)
  let splitNumber = 5
  let splitData = maxData / splitNumber
  let splitLength = yAxisLength * (splitData / maxData)
  let w = xAxisLength / yAxisData.length
  let barW = w * 0.6
  let barGap = w * 0.4

  canvas.setAttribute('width', canvasW * ratio)
  canvas.setAttribute('height', canvasH * ratio)
  canvas.style.width = canvasW + 'px'
  canvas.style.height = canvasH + 'px'
  ctx.scale(ratio, ratio)

  drawLine(ctx, xAxisX1, xAxisY1, xAxisX2, xAxisY1, axisColor)
  
  drawLine(ctx, yAxisX1, yAxisY1, yAxisX1, yAxisY2, axisColor)

  // 分隔线
  for (let i = 0; i < splitNumber; i++) {
    let splitLineY1 = yAxisY1 + splitLength * i

    drawLine(ctx, xAxisX1, splitLineY1, xAxisX2, splitLineY1, axisColor)

    drawText(ctx, xAxisX1 - 20, splitLineY1 + 5, splitData * (splitNumber - i))
  }

  let lastX
  let lastY
  for (let i = 0, len = yAxisData.length; i < len; i++) {
    let item = yAxisData[i]
    let barHeight = yAxisLength * (item / maxData)
    let barX =  xAxisX1 + (barW + barGap) * i
    let barY = xAxisY1 - barHeight
    
    let lineX = barX + barW / 2
    let lineY = xAxisY1 - barHeight

    if (i !== 0) {
      drawLine(ctx, lastX, lastY, lineX, lineY, barColor)
    }

    drawCircle(ctx, lineX, lineY, 5)
    lastX = lineX
    lastY = lineY
    drawText(ctx, barX + barW / 2, xAxisY1 + 20, xAxisData[i])
  }
}

function drawLine(ctx, x1, y1, x2, y2, color) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.stroke()
}

function drawText(ctx, x, y, text) {
  ctx.beginPath()
  ctx.font = '14px monaco'
  ctx.textAlign = 'center'
  ctx.fillText(text, x ,y)
}

function drawCircle(ctx, cx, cy, radius) {
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2, true)
  ctx.fill()
}
