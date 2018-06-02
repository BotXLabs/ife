import { sourceData, updateDataByIndex } from './ife31data'
import lineChart from './line'
import barChart from './bar'

let wrapper = document.getElementById('table-wrapper')
let curEditingTd = null
let curEditingTdVal = null
let curInput = null

const REGION_MAP = {
  east: '华东',
  south: '华南',
  north: '华北'
}
const PRODUCT_MAP = {
  cellphone: '手机',
  laptop: '笔记本',
  speaker: '智能音箱'
}

wrapper.onmousemove = function(e) {
  // console.log(e.target.tagName)
  let target = e.target
  if (target.tagName === 'TD') {
    let tr = target.parentNode
    let index = tr.getAttribute('data-index')
    // console.log(index)
    let chartData = getData()[index]
    lineChart.setData([chartData])
    barChart.setData([chartData])
  }
}

function updateChart() {
  lineChart.setData(getData())
  barChart.setData(getData())
}

wrapper.onmouseleave = function(e) {
  updateChart()
}

function isNum(n) {
  return !isNaN(parseFloat(n))
}

function handleEditingInputByKeyboard(e) {
  if (curInput && curInput === document.activeElement) {
    switch (e.keyCode) {
      case 27:
        console.log('esc')
        handleEditingCancel()
        break;
      case 13:
        console.log('enter')
        handleEditingSubmit()
        break;
      default:
        break;
    }
  }
}

function bindKeyboardEvent() {
  window.addEventListener('keydown', handleEditingInputByKeyboard)
}

function unbindKeyboardEvent() {
  window.removeEventListener('keydown', handleEditingInputByKeyboard)
}

function resetCurEditingTd() {
  if (curEditingTd) {
    curEditingTd.classList.remove('editing')
    curEditingTd.classList.add('editable')
    curEditingTd.innerHTML = curEditingTdVal
    curEditingTd = null
    curEditingTdVal = null
    unbindKeyboardEvent()
  }
}

function handleEditingCancel() {
  resetCurEditingTd()
}

function handleEditingSubmit() {
  let newData = curInput.value.trim()
  if (!newData || !isNum(newData)) {
    alert('请输入正确的数字!')
  } else {
    let curTr = curEditingTd.parentNode
    let trIndex = curTr.getAttribute('row-index')
    let tdIndex = curEditingTd.getAttribute('data-index')
    updateDataByIndex(trIndex, tdIndex, newData)
    updateChart()
    renderTable()
    // console.log(trIndex, tdIndex)
    resetCurEditingTd()
  }
}

document.onclick = function(e) {
  resetCurEditingTd()
}

wrapper.onclick = function(e) {
  let target = e.target
  let needStop = false
  if (target.classList.contains('editable')) {
    let content = target.innerHTML
    target.innerHTML = `<input type="text" placeholder="${content}"><button class="cancel">取消</button><button class="submit">确定</button>`
    target.classList.remove('editable')
    target.classList.add('editing')
    resetCurEditingTd(target, content)
    curEditingTd = target
    curEditingTdVal = content
    needStop = true
    curInput = target.querySelector('input')
    curInput.focus()
    // console.log(curInput)
    bindKeyboardEvent()
  } else if (target.classList.contains('cancel')) {
    handleEditingCancel()
    needStop = true
  } else if (target.classList.contains('submit')) {
    // console.log(target)
    handleEditingSubmit()
    needStop = true
  } else if (target.classList.contains('editing') || target === curInput) {
    needStop = true
  }
  if (needStop) {
    e.stopPropagation()
  }
}

export function getData() {
  
  let cbxCheckedList = container.querySelectorAll('input:not([value="all"]):checked')
  let filterArray = []

  for (let cbx of cbxCheckedList) {
    if (REGION_MAP[cbx.value]) {
      filterArray.push(REGION_MAP[cbx.value])
    } else if (PRODUCT_MAP[cbx.value]) {
      filterArray.push(PRODUCT_MAP[cbx.value])
    }
  }

  let ret = []
  for (let i = 0, len = sourceData.length; i < len; i++) {
    let data = sourceData[i]
    if (filterArray.includes(data.region) && filterArray.includes(data.product)) {
      // 
      data.rowIndex = i
      ret.push(data)
    }
  }
  return ret
}

export function renderTable() {
  // 根据表单选项获取数据
  // 渲染表格
  console.log('render table')
  wrapper.innerHTML = ''
  let table = document.createElement('table')
  let thead = document.createElement('thead')
  let tbody = document.createElement('tbody')
  let regionList = container.querySelectorAll('#region-radio-wrapper input:not([value="all"]):checked')
  let productList = container.querySelectorAll('#product-radio-wrapper input:not([value="all"]):checked')
  let regionLen = regionList.length
  let productLen = productList.length
  let tbodyData = getData()
  let tbodyDataLen = tbodyData.length
  let isRegionFirstCol = false

  let theadData = Array.from({length: 12}, (v, k) => k+1)

  if (regionLen === 1 && productLen > 1) {
    isRegionFirstCol = true
    theadData.unshift('商品')
    theadData.unshift('地区')
  } else {
    theadData.unshift('地区')
    theadData.unshift('商品')
  }

  let tr = document.createElement('tr')
  for (let i = 0, len = theadData.length; i < len; i++) {
    let td = document.createElement('th')
    if (i < 2) {
      td.innerHTML = theadData[i]
    } else {
      td.innerHTML = theadData[i] + '月'
    }
    tr.appendChild(td)
  }
  thead.appendChild(tr)
  table.appendChild(thead)

  // console.log(tbodyData.length)
  for (let i = 0; i < tbodyDataLen; i++) {
    console.log(tbodyDataLen)
    let tr = document.createElement('tr')
    tr.setAttribute('data-index', i)
    let data = tbodyData[i]
    tr.setAttribute('row-index', data.rowIndex)
    let product = data.product
    let region = data.region
    let sale = data.sale

    let regionTd = document.createElement('td')
    regionTd.innerHTML = region

    let productTd = document.createElement('td')
    productTd.innerHTML = product

    if (isRegionFirstCol) {
      regionTd.rowSpan = tbodyDataLen
      if (i === 0) {
        tr.appendChild(regionTd)
      }
      tr.appendChild(productTd)
    } else {
      if (regionLen > 1) {
        productTd.rowSpan = regionLen
        if (i % regionLen === 0) {
          tr.appendChild(productTd)
        }
        tr.appendChild(regionTd)
      } else {
        tr.appendChild(productTd)
        tr.appendChild(regionTd)
      }
    }

    for (let i = 0, len = sale.length; i < len; i++) {
      let td = document.createElement('td')
      td.classList.add('editable')
      td.setAttribute('data-index', i)
      td.innerHTML = sale[i]
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  wrapper.appendChild(table)

}
