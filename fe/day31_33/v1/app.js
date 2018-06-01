let regionGroup = document.getElementById('region-group')
let productGroup = document.getElementById('product-group')
let wrapper = document.getElementById('table-wrapper')
let curRegion = null
let curProduct = null
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

regionGroup.onclick = function (e) {
  // 渲染新的表格()
  if (e.target.type === 'radio') {
    console.log(e.target)
    if (curRegion !== e.target.value) {
      curRegion = e.target.value
      renderTable()
    }
  }
}

productGroup.onclick = function (e) {
  // 渲染新的表格()
  if (e.target.type === 'radio') {
    console.log(e.target)
    if (curProduct !== e.target.value) {
      curProduct = e.target.value
      renderTable()
    }
  }
}

function getData() {
  // 遍历数据 {
  //     向要返回的数据list中添加符合表单所选项的数据
  // }
  // 返回数据
  let ret = []
  for (let i = 0, len = sourceData.length; i < len; i++) {
    let data = sourceData[i]
    let pass = true

    if (curRegion && data.region !== REGION_MAP[curRegion]) {
      pass = false
    }

    if (curProduct && data.product !== PRODUCT_MAP[curProduct]) {
      pass = false
    }

    if (pass) {
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
  let tbodyData = getData()
  let tbodyDataLen = tbodyData.length
  let firstCol = null

  let theadData = Array.from({length: 12}, (v, k) => k+1)

  if (tbodyDataLen > 1) {
    if (curProduct) {
      firstCol = 'product'
      theadData.unshift('地区')
      theadData.unshift('商品')
    } else if (curRegion) {
      firstCol = 'region'
      theadData.unshift('商品')
      theadData.unshift('地区')
    } else {
      theadData.unshift('商品')
      theadData.unshift('地区')
    }
  } else {
    theadData.unshift('商品')
    theadData.unshift('地区')
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

    if (firstCol === 'region') {
      regionTd.rowSpan = tbodyDataLen
      if (i === 0) {
        tr.appendChild(regionTd)
      }
      tr.appendChild(productTd)
    } else if (firstCol === 'product') {
      productTd.rowSpan = tbodyDataLen
      if (i === 0) {
        tr.appendChild(productTd)
      }
      tr.appendChild(regionTd)
    } else {
      tr.appendChild(regionTd)
      tr.appendChild(productTd)
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
