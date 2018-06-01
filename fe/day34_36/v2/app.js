let regionRadioWrapper = document.getElementById('region-radio-wrapper')
let productRadioWrapper = document.getElementById('product-radio-wrapper')
let container = document.getElementById('container')

createCheckBoxGroup(regionRadioWrapper, [{
    value: 'east',
    text: '华东'
  },
  {
    value: 'south',
    text: '华南'
  },
  {
    value: 'north',
    text: '华北'
  }
])

createCheckBoxGroup(productRadioWrapper, [{
    value: 'cellphone',
    text: '手机'
  },
  {
    value: 'laptop',
    text: '笔记本'
  },
  {
    value: 'speaker',
    text: '智能音箱'
  }
])

container.addEventListener('click', function (e) {
  if (e.target.type === 'checkbox') {
    // console.log(e.target)
    renderTable()
    lineChart.setData(getData())
  }
})

renderTable()

let series = getData()

// let yAxisData = sourceData[0].sale
let yAxisData = series[0].sale
let xAxisData = Array.from({
  length: 12
}, (v, k) => (k + 1) + '月')

drawBar('bar-chart-wrapper', {
  xAxisData,
  yAxisData
})

lineChart.init('line-chart-wrapper', {
  xAxis: {
    data: xAxisData
  },
  series: series
})
