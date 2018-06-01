let lineChart = {
  data: [],
  init: function(wrapperId, options) {
    this.wrapper = document.getElementById(wrapperId)
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
  
    let devicePixelRatio = window.devicePixelRatio || 1
    let backingStoreRatio = this.ctx.webkitBackingStorePixelRatio ||
                            this.ctx.mozBackingStorePixelRatio ||
                            this.ctx.msBackingStorePixelRatio ||
                            this.ctx.oBackingStorePixelRatio ||
                            this.ctx.backingStorePixelRatio || 1
    this.ratio = devicePixelRatio / backingStoreRatio
  
    this.xAxisData = options.xAxisData
    this.yAxisData = options.yAxisData
  
    this.canvasW = this.wrapper.clientWidth
    this.canvasH = this.wrapper.clientHeight
    this.canvasPadding = 60
    this.xAxisLength = this.canvasW - 2 * this.canvasPadding
    this.yAxisLength = this.canvasH - 2 * this.canvasPadding
    this.xAxisX1 = this.canvasPadding
    this.xAxisX2 = this.canvasPadding + this.xAxisLength
    this.xAxisY1 = this.canvasH - this.canvasPadding
    this.yAxisX1 = this.canvasPadding
    this.yAxisY1 = this.canvasPadding
    this.yAxisY2 = this.canvasH - this.canvasPadding
  
    this.axisColor = '#ccc'
    this.barColor = '#83bff6'
    this.textColor = 'black'

    this.splitNumber = 5

    this.draw()
  },
  draw: function() {

    this.maxData = Math.max.apply(null, this.yAxisData)
    this.splitData = this.maxData / this.splitNumber
    this.splitLength = this.yAxisLength * (this.splitData / this.maxData)
    this.w = this.xAxisLength / this.yAxisData.length
    this.barW = this.w * 0.6
    this.barGap = this.w * 0.4
  
    this.canvas.setAttribute('width', this.canvasW * this.ratio)
    this.canvas.setAttribute('height', this.canvasH * this.ratio)
    this.canvas.style.width = this.canvasW + 'px'
    this.canvas.style.height = this.canvasH + 'px'
    this.ctx.scale(this.ratio, this.ratio)
  
    drawLine(this.ctx, this.xAxisX1, this.xAxisY1, this.xAxisX2, this.xAxisY1, this.axisColor)
    
    drawLine(this.ctx, this.yAxisX1, this.yAxisY1, this.yAxisX1, this.yAxisY2, this.axisColor)
  
    // 分隔线
    for (let i = 0; i < this.splitNumber; i++) {
      let splitLineY1 = this.yAxisY1 + this.splitLength * i
  
      drawLine(this.ctx, this.xAxisX1, splitLineY1, this.xAxisX2, splitLineY1, this.axisColor)
  
      drawText(this.ctx, this.xAxisX1 - 20, splitLineY1 + 5, this.splitData * (this.splitNumber - i))
    }
  
    let lastX
    let lastY
    for (let i = 0, len = this.yAxisData.length; i < len; i++) {
      let item = this.yAxisData[i]
      let barHeight = this.yAxisLength * (item / this.maxData)
      let barX =  this.xAxisX1 + (this.barW + this.barGap) * i
      let barY = this.xAxisY1 - barHeight
      
      let lineX = barX + this.barW / 2
      let lineY = this.xAxisY1 - barHeight
  
      if (i !== 0) {
        drawLine(this.ctx, lastX, lastY, lineX, lineY, this.barColor)
      }
  
      drawCircle(this.ctx, lineX, lineY, 2)
      lastX = lineX
      lastY = lineY
      drawText(this.ctx, barX + this.barW / 2, this.xAxisY1 + 20, this.xAxisData[i])
    }
  },
  setData: function(yAxisData) {
    // this.xAxisData = xAxisData
    this.yAxisData = yAxisData
    this.draw()
  }
}

// function drawLineChart(wrapperId, options) {

//   let wrapper = document.getElementById(wrapperId)
//   let canvas = document.getElementById('canvas')
//   let ctx = canvas.getContext('2d')

//   var devicePixelRatio = window.devicePixelRatio || 1
//   var backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
//                           ctx.mozBackingStorePixelRatio ||
//                           ctx.msBackingStorePixelRatio ||
//                           ctx.oBackingStorePixelRatio ||
//                           ctx.backingStorePixelRatio || 1
//   var ratio = devicePixelRatio / backingStoreRatio

//   let { xAxisData, yAxisData } = options

//   let canvasW = wrapper.clientWidth
//   let canvasH = wrapper.clientHeight
//   let canvasPadding = 60
//   let xAxisLength = canvasW - 2 * canvasPadding
//   let yAxisLength = canvasH - 2 * canvasPadding
//   let xAxisX1 = canvasPadding
//   let xAxisX2 = canvasPadding + xAxisLength
//   let xAxisY1 = canvasH - canvasPadding
//   let yAxisX1 = canvasPadding
//   let yAxisY1 = canvasPadding
//   let yAxisY2 = canvasH - canvasPadding

//   let axisColor = '#ccc'
//   let barColor = '#83bff6'
//   let textColor = 'black'

//   let maxData = Math.max.apply(null, yAxisData)
//   let splitNumber = 5
//   let splitData = maxData / splitNumber
//   let splitLength = yAxisLength * (splitData / maxData)
//   let w = xAxisLength / yAxisData.length
//   let barW = w * 0.6
//   let barGap = w * 0.4

//   canvas.setAttribute('width', canvasW * ratio)
//   canvas.setAttribute('height', canvasH * ratio)
//   canvas.style.width = canvasW + 'px'
//   canvas.style.height = canvasH + 'px'
//   ctx.scale(ratio, ratio)

//   drawLine(ctx, xAxisX1, xAxisY1, xAxisX2, xAxisY1, axisColor)
  
//   drawLine(ctx, yAxisX1, yAxisY1, yAxisX1, yAxisY2, axisColor)

//   // 分隔线
//   for (let i = 0; i < splitNumber; i++) {
//     let splitLineY1 = yAxisY1 + splitLength * i

//     drawLine(ctx, xAxisX1, splitLineY1, xAxisX2, splitLineY1, axisColor)

//     drawText(ctx, xAxisX1 - 20, splitLineY1 + 5, splitData * (splitNumber - i))
//   }

//   let lastX
//   let lastY
//   for (let i = 0, len = yAxisData.length; i < len; i++) {
//     let item = yAxisData[i]
//     let barHeight = yAxisLength * (item / maxData)
//     let barX =  xAxisX1 + (barW + barGap) * i
//     let barY = xAxisY1 - barHeight
    
//     let lineX = barX + barW / 2
//     let lineY = xAxisY1 - barHeight

//     if (i !== 0) {
//       drawLine(ctx, lastX, lastY, lineX, lineY, barColor)
//     }

//     drawCircle(ctx, lineX, lineY, 2)
//     lastX = lineX
//     lastY = lineY
//     drawText(ctx, barX + barW / 2, xAxisY1 + 20, xAxisData[i])
//   }
// }

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
