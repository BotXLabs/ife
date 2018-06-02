// 生成一组CheckBox
export function createCheckBoxGroup(wrapper, data) {

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

  let count = 0
  for (let i = 0; i < dataLen; i++) {
    let { value, text, checked } = data[i]
    if (checked) {
      count++
    }
    groupHtml += [
      '<input type="checkbox" value="',
      value,
      '"',
      // i === 0 ? ' checked' : '',
      checked ? ' checked' : '',
      '>',
      '<label>',
      text,
      '</label>'
    ].join('')
  }

  wrapper.innerHTML = groupHtml

  selectAllCbx = wrapper.querySelector('input[value="all"]')

  selectAllCbx.checked = count === dataLen

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
}
