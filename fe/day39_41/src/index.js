import './style.css'
import {
  createCheckBoxGroup
} from './libs/checkbox'
import {
  renderTable,
  getData
} from './libs/table'
import lineChart from './libs/line'
import barChart from './libs/bar'
import {
  getQueryArray
} from './libs/hash'

let regionRadioWrapper = document.getElementById('region-radio-wrapper')
let productRadioWrapper = document.getElementById('product-radio-wrapper')
let container = document.getElementById('container')


function renderCheckbox() {
  let queryArray = getQueryArray()
  let isChecked = (val) => queryArray.includes(val)

  createCheckBoxGroup(regionRadioWrapper, [{
      value: 'east',
      text: '华东',
      checked: isChecked('east')
    },
    {
      value: 'south',
      text: '华南',
      checked: isChecked('south')
    },
    {
      value: 'north',
      text: '华北',
      checked: isChecked('north')
    }
  ])

  createCheckBoxGroup(productRadioWrapper, [{
      value: 'cellphone',
      text: '手机',
      checked: isChecked('cellphone')
    },
    {
      value: 'laptop',
      text: '笔记本',
      checked: isChecked('laptop')
    },
    {
      value: 'speaker',
      text: '智能音箱',
      checked: isChecked('speaker')
    }
  ])
}



container.addEventListener('click', function (e) {
  if (e.target.type === 'checkbox') {
    let cbxCheckedList = container.querySelectorAll('input:not([value="all"]):checked')
    let ret = []
    for (let cbx of cbxCheckedList) {
      ret.push(cbx.value)
    }
    location.hash = '#' + ret.join('&')
  }
})


function render() {
  let data = getData()
  renderTable()
  // let data = getData()
  lineChart.setData(data)
  barChart.setData(data)
}

window.onhashchange = render

window.onpopstate = function () {
  renderCheckbox()
  render()
}


renderCheckbox()

renderTable()

let series = getData()

let xAxisData = Array.from({
  length: 12
}, (v, k) => (k + 1) + '月')

barChart.init('bar-chart-wrapper', {
  xAxis: {
    data: xAxisData
  },
  series
})

lineChart.init('line-chart-wrapper', {
  xAxis: {
    data: xAxisData
  },
  series: series
})
