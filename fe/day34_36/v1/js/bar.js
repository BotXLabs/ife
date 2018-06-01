function drawBar(wrapperId, options) {
  // 定义好柱状图绘制区域的高度，宽度，轴的高度，宽度
  // 定义好每一个柱子的宽度及柱子的间隔宽度
  // 定义好柱子颜色，轴的颜色

  // 拿到柱状图中的最大值Max
  // 根据Max和你用来绘制柱状图图像区域的高度，进行一个数据和像素的折算比例

  // 绘制横轴及纵轴
  // 遍历数据 {
  //     计算将要绘制柱子的高度和位置
  //     绘制每一个柱子
  // }    

  let wrapper = document.getElementById(wrapperId)

  let { xAxisData, yAxisData } = options

  let svgW = wrapper.clientWidth
  let svgH = wrapper.clientHeight
  let svgPadding = 60
  let xAxisLength = svgW - 2 * svgPadding
  let yAxisLength = svgH - 2 * svgPadding
  let xAxisX1 = svgPadding
  let xAxisX2 = svgPadding + xAxisLength
  let xAxisY1 = svgH - svgPadding
  let yAxisX1 = svgPadding
  let yAxisY1 = svgPadding
  let yAxisY2 = svgH - svgPadding

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

  let svg = createSVGElem('svg', {
    'width': svgW,
    'height': svgH
  })
  // document.body.prepend(svg)
  wrapper.appendChild(svg)

  let xAxis = createSVGElem('line', {
    'x1': xAxisX1,
    'x2': xAxisX2,
    'y1': xAxisY1,
    'y2': xAxisY1,
    'stroke': axisColor
  })
  svg.appendChild(xAxis)
  
  let yAxis = createSVGElem('line', {
    'x1': yAxisX1,
    'x2': yAxisX1,
    'y1': yAxisY1,
    'y2': yAxisY2,
    'stroke': axisColor
  })
  svg.appendChild(yAxis)

  // 分隔线
  for (let i = 0; i < splitNumber; i++) {
    let splitLineY1 = yAxisY1 + splitLength * i
    let splitLine = createSVGElem('line', {
      'x1': xAxisX1,
      'x2': xAxisX2,
      'y1': splitLineY1,
      'y2': splitLineY1,
      'stroke': axisColor
    })
    svg.appendChild(splitLine)

    let text = createSVGElem('text', {
      'x': xAxisX1 - 20,
      'y': splitLineY1 + 5,
      'fill': textColor,
      'text-anchor': 'middle'
    })
    text.innerHTML = splitData * (splitNumber - i)
    svg.appendChild(text)
  }

  // 每一个柱子
  for (let i = 0, len = yAxisData.length; i < len; i++) {
    let item = yAxisData[i]
    let barHeight = yAxisLength * (item / maxData)
    let barX =  xAxisX1 + (barW + barGap) * i
    let barY = xAxisY1 - barHeight
    let bar = createSVGElem('rect', {
      'x': barX,
      'y': barY,
      'width': barW,
      'height': barHeight,
      'fill': barColor
    })
    svg.appendChild(bar)

    let dataText = createSVGElem('text', {
      'x': barX + barW / 2,
      'y': barY + 20,
      'fill': textColor,
      'text-anchor': 'middle'
    })
    dataText.innerHTML = yAxisData[i]
    svg.appendChild(dataText)

    let labelText = createSVGElem('text', {
      'x': barX + barW / 2,
      'y': xAxisY1 + 20,
      'fill': textColor,
      'text-anchor': 'middle'
    })
    labelText.innerHTML = xAxisData[i]
    svg.appendChild(labelText)
  }
}

function createSVGElem(tag, data) {
  let elem = document.createElementNS('http://www.w3.org/2000/svg', tag)
  if (data) {
    for (let [key, value] of Object.entries(data)) {
      elem.setAttribute(key, value)
    }
  }
  return elem
}
