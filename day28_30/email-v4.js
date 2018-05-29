let emailInput = document.getElementById('email-input')
let emailSugWrapper = document.getElementById('email-sug-wrapper')
let sugListLen = 0
let nowSelectTipIndex = 0

function focusEmailInput() {
  emailInput.focus()
}

focusEmailInput()

emailInput.oninput = function () {
  // 获取用户输入， 生成提示框中的提示内容， 将提示内容添加到email - sug - wrapper中
  // 控制email - sug - wrapper的显示 / 隐藏状态
  nowSelectTipIndex = 0
  toggleSugWrapperDisplay()
}

emailSugWrapper.onclick = function (e) {
  let target = e.target
  if (target.tagName = 'LI') {
    emailInput.value = htmlDecode(target.innerHTML)
    hideSugWrapper()
    focusEmailInput()
  }
}

function handleSelectTipByKeyboard(e) {
  switch (e.keyCode) {
    case 27:
      // console.log('esc')
      emailInput.setSelectionRange(0, -1)
      hideSugWrapper()
      break;
    case 13:
      // console.log('enter')
      emailInput.value = htmlDecode(emailSugWrapper.querySelector('li.active').innerHTML)
      hideSugWrapper()
      break;
    case 38:
      // console.log('up')
      nowSelectTipIndex = (nowSelectTipIndex - 1 + sugListLen) % sugListLen
      renderSugList()
      break;
    case 40:
      // console.log('down', sugListLen)
      nowSelectTipIndex = (nowSelectTipIndex + 1) % sugListLen
      renderSugList()
      break;
  
    default:
      break;
  }
}

// 重置选中状态
function resetNowSelectTip() {
  // 将 nowSelectTipIndex 设为0
  nowSelectTipIndex = 0
}

function getEmailInputVal() {
  // 拿到input输入框的输入内容trim后返回
  return emailInput.value.trim()
}

function genSugList() {
  // 获取用户输入
  // 遍历postfixList {
  //   把用户输入和每一个postfix进行结合成为每一个Li
  // }
  // 返回生成的提示内容
  let normalRet = []
  let prefixMatchingRet = []
  let emailInputVal = htmlEncode(getEmailInputVal())

  if (!emailInputVal) {
    return ''
  }

  let index = emailInputVal.indexOf('@')
  let prefixStr = ''

  if (index > -1) {
    prefixStr = emailInputVal.substring(index + 1)
    emailInputVal = emailInputVal.substring(0, index)
  }

  let matchingIndex = 0
  for (let [index, postfix] of postfixList.entries()) {
    let preTag = index === nowSelectTipIndex ? '<li class="active">' : '<li>'
    let endTag = emailInputVal + '@' + postfix + '</li>'
    if (prefixStr && postfix.startsWith(prefixStr)) {
      let matchingPreTag = matchingIndex === nowSelectTipIndex ? '<li class="active">' : '<li>'
      prefixMatchingRet.push(matchingPreTag + endTag)
      matchingIndex++
    }
    normalRet.push(preTag + endTag)
  }
  let ret = prefixMatchingRet.length ? prefixMatchingRet : normalRet
  sugListLen = ret.length
  return ret.join('')
}

// 将提示内容添加到email - sug - wrapper中
function renderSugList() {
  // 获取生成提示框中的提示内容
  // 将内容添加到email - sug - wrapper中
  let sugList = genSugList()
  emailSugWrapper.innerHTML = sugList
}

// 控制email - sug - wrapper的显示 / 隐藏状态
function toggleSugWrapperDisplay() {
  // 用户输入为空 
  if (!getEmailInputVal()) {
    hideSugWrapper()
  } else {
    renderSugList()
    showSugWrapper()
  }
}

function hideSugWrapper() {
  // 做具体隐藏提示框的操作
  emailSugWrapper.style.display = 'none'
  window.removeEventListener('keydown', handleSelectTipByKeyboard)
}

function showSugWrapper() {
  // 做具体显示提示框的操作
  emailSugWrapper.style.display = 'block'
  window.addEventListener('keydown', handleSelectTipByKeyboard)
}
