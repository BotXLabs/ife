let wrapper = document.getElementById('table-wrapper')
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

function getData() {
  
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
      ret.push(data)
    }
  }
  return ret
}

function renderTable() {
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
    let td = document.createElement('td')
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
    let data = tbodyData[i]
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
      td.innerHTML = sale[i]
      tr.appendChild(td)
    }
    tbody.appendChild(tr)
  }

  table.appendChild(tbody)
  wrapper.appendChild(table)

}
