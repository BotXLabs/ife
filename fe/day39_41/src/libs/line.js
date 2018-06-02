import { drawLine, drawCircle, drawText, ratio, clear } from './canvas'

let lineChart = {
  init: function(wrapperId, options) {
    this.wrapper = document.getElementById(wrapperId)
    this.canvas = document.getElementById('canvas')
    this.ctx = canvas.getContext('2d')
  
    this.ratio = ratio
  
    this.xAxisData = options.xAxis.data
    this.series = options.series
  
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
    // this.barColor = '#83bff6'
    this.color = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    this.textColor = 'black'

    this.splitNumber = 5

    this.draw()
  },
  draw: function() {

    if (!this.series || !this.series.length) {
      return
    }

    // this.maxData = Math.max.apply(null, this.yAxisData)
    this.yAxisDataLength = this.series[0].sale.length
    this.maxData = Math.max.apply(null, this.series.map(data => Math.max.apply(null, data.sale)))
    // console.log(this.maxData)
    this.splitData = this.maxData / this.splitNumber
    this.splitLength = this.yAxisLength * (this.splitData / this.maxData)
    this.w = this.xAxisLength / this.yAxisDataLength
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
  
    for (let j = 0, len = this.series.length; j < len; j++) {
      let seriesItem = this.series[j]
      let sale = seriesItem.sale
      let lastX
      let lastY
      for (let i = 0; i < this.yAxisDataLength; i++) {
        let item = sale[i]
        let barHeight = this.yAxisLength * (item / this.maxData)
        let barX =  this.xAxisX1 + (this.barW + this.barGap) * i
        let barY = this.xAxisY1 - barHeight
        
        let lineX = barX + this.barW / 2
        let lineY = this.xAxisY1 - barHeight
    
        if (i !== 0) {
          drawLine(this.ctx, lastX, lastY, lineX, lineY, this.color[j])
        }
    
        drawCircle(this.ctx, lineX, lineY, 2)
        lastX = lineX
        lastY = lineY
        if (j === 0) {
          drawText(this.ctx, barX + this.barW / 2, this.xAxisY1 + 20, this.xAxisData[i])
        }
      }
    }
  },
  setData: function(series) {
    // this.xAxisData = xAxisData
    this.series = series
    clear(this.canvas)
    this.draw()
  }
}

export default lineChart
