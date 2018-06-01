import { drawLine, dataText, drawRect, drawText, drawSVG } from './svg'

let barChart = {
  init: function(wrapperId, options) {
    this.wrapper = document.getElementById(wrapperId)
  
    this.xAxisData = options.xAxis.data
    this.series = options.series
    this.yAxisDataLength = this.series[0].sale.length
  
    this.svgW = this.wrapper.clientWidth
    this.svgH = this.wrapper.clientHeight
    this.svgPadding = 60
    this.xAxisLength = this.svgW - 2 * this.svgPadding
    this.yAxisLength = this.svgH - 2 * this.svgPadding
    this.xAxisX1 = this.svgPadding
    this.xAxisX2 = this.svgPadding + this.xAxisLength
    this.xAxisY1 = this.svgH - this.svgPadding
    this.yAxisX1 = this.svgPadding
    this.yAxisY1 = this.svgPadding
    this.yAxisY2 = this.svgH - this.svgPadding
  
    this.axisColor = '#ccc'
    // this.barColor = '#83bff6'
    this.color = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3']
    this.textColor = 'black'

    this.splitNumber = 5

    this.svg = drawSVG(this.svgW, this.svgH)
    this.wrapper.appendChild(this.svg)

    this.draw()
  },
  draw: function() {

    // this.maxData = Math.max.apply(null, this.yAxisData)
    this.maxData = Math.max.apply(null, this.series.map(data => Math.max.apply(null, data.sale)))
    // console.log(this.maxData)
    this.splitData = this.maxData / this.splitNumber
    this.splitLength = this.yAxisLength * (this.splitData / this.maxData)
    this.w = this.xAxisLength / this.yAxisDataLength
    this.barW = this.w * 0.6
    this.barGap = this.w * 0.4
  
  
    drawLine(this.svg, this.xAxisX1, this.xAxisY1, this.xAxisX2, this.xAxisY1, this.axisColor)
    
    drawLine(this.svg, this.yAxisX1, this.yAxisY1, this.yAxisX1, this.yAxisY2, this.axisColor)
  
    // 分隔线
    for (let i = 0; i < this.splitNumber; i++) {
      let splitLineY1 = this.yAxisY1 + this.splitLength * i
  
      drawLine(this.svg, this.xAxisX1, splitLineY1, this.xAxisX2, splitLineY1, this.axisColor)
  
      drawText(this.svg, this.xAxisX1 - 20, splitLineY1 + 5, this.splitData * (this.splitNumber - i), this.textColor)
    }

    for (let j = 0, len = this.series.length; j < len; j++) {
      let seriesItem = this.series[j]
      let sale = seriesItem.sale
      let bW = this.barW / len
      for (let i = 0; i < this.yAxisDataLength; i++) {
        let item = sale[i]
        let barHeight = this.yAxisLength * (item / this.maxData)
        let barX =  this.xAxisX1 + (this.barW + this.barGap) * i + (bW * j)
        let barY = this.xAxisY1 - barHeight
        
        drawRect(this.svg, barX, barY, bW, barHeight, this.color[j])
        if (j === 0) {
          let textX = this.xAxisX1 + (this.barW + this.barGap) * i
          drawText(this.svg, textX + this.barW / 2, this.xAxisY1 + 20, this.xAxisData[i])
        }
      }
    }
  },
  setData: function(series) {
    // this.xAxisData = xAxisData
    this.series = series
    this.svg.innerHTML = ''
    this.draw()
  }
}

export default barChart
