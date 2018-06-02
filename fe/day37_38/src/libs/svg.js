function createSVGElem(tag, data) {
  let elem = document.createElementNS('http://www.w3.org/2000/svg', tag)
  if (data) {
    for (let [key, value] of Object.entries(data)) {
      elem.setAttribute(key, value)
    }
  }
  return elem
}

export function drawSVG(svgW, svgH) {
  let svg = createSVGElem('svg', {
    'width': svgW,
    'height': svgH
  })
  return svg
}

export function drawLine(svg, x1, y1, x2, y2, color) {
  svg.appendChild(createSVGElem('line', {
    x1,
    x2,
    y1,
    y2,
    stroke: color
  }))
}

export function drawText(svg, x, y, title, color) {
  let text = createSVGElem('text', {
    x,
    y,
    fill: color,
    'text-anchor': 'middle'
  })
  text.innerHTML = title
  svg.appendChild(text)
}

export function drawRect(svg, x, y, width, height, color) {
  let rect = createSVGElem('rect', {
    x,
    y,
    width,
    height,
    fill: color
  })
  svg.appendChild(rect)
}
