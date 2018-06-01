// 生成一组CheckBox
function createCheckBoxGroup(wrapper, data) {
  // 生成全选checkbox的html，给一个自定义属性表示为全选checkbox，比如checkbox-type="all"
  // 遍历参数对象 {
  //     生成各个子选项checkbox的html，给一个自定义属性表示为子选项
  // }
  // 容器innerHTML = 生成好的html集合

  // 给容器做一个事件委托 = function() {
  //     if 是checkbox
  //         读取自定义属性
  //         if 全选
  //             做全选对应的逻辑
  //         else
  //             做子选项对应的逻辑
  // }

  let groupHtml = ''
  let dataLen = data.length
  let selectAllCbx

  groupHtml += [
    '<input type="checkbox" value="',
    'all',
    '">',
    '<label>',
    '全选',
    '</label>'
  ].join('')

  for (let i = 0; i < dataLen; i++) {
    let { value, text } = data[i]
    groupHtml += [
      '<input type="checkbox" value="',
      value,
      '"',
      // i === 0 ? ' checked' : '',
      '>',
      '<label>',
      text,
      '</label>'
    ].join('')
  }
  wrapper.innerHTML = groupHtml

  selectAllCbx = wrapper.querySelector('input[value="all"]')

  function selectAll() {
    let cbxList = wrapper.querySelectorAll('input:not([value="all"])')
    for (let cbx of cbxList) {
      if (!cbx.checked) {
        cbx.checked = true
      }
    }
  }

  wrapper.onclick = function(e) {
    let target = e.target
    if (target.type === 'checkbox') {
      let value = target.value
      if (value === 'all') {
        if (!target.checked) {
          target.checked = true
          e.stopPropagation()
        } else {
          selectAll()
        }
      } else {
        let cbxCheckedList = wrapper.querySelectorAll('input:not([value="all"]):checked')
        if (cbxCheckedList.length === 0) {
          target.checked = true
          e.stopPropagation()
        } else {
          selectAllCbx.checked = cbxCheckedList.length === data.length
        }
      }
    }
  }

  selectAllCbx.click()
}
