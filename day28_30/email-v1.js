let emailInput = document.getElementById('email-input')
let emailSugWrapper = document.getElementById('email-sug-wrapper')

emailInput.oninput = function () {
  // 获取用户输入， 生成提示框中的提示内容， 将提示内容添加到email - sug - wrapper中
  // 控制email - sug - wrapper的显示 / 隐藏状态
  toggleSugWrapperDisplay()
}

function getEmailInput() {
  // 拿到input输入框的输入内容trim后返回
  return emailInput.value.trim()
}

function genSugList() {
  // 获取用户输入
  // 遍历postfixList {
  //   把用户输入和每一个postfix进行结合成为每一个Li
  // }
  // 返回生成的提示内容
  let emailInput = getEmailInput()
  let ret = []
  for (let postfix of postfixList) {
    ret.push(emailInput + '@' + postfix)
  }
  return ret
}

// 将提示内容添加到email - sug - wrapper中
function renderSugList() {
  // 获取生成提示框中的提示内容
  // 将内容添加到email - sug - wrapper中
  let sugList = genSugList()
  let ret = ''
  for (let sug of sugList) {
    ret += `<li>${sug}</li>`
  }
  emailSugWrapper.innerHTML = ret
}

// 控制email - sug - wrapper的显示 / 隐藏状态
function toggleSugWrapperDisplay() {
  // 用户输入为空 
  if (!getEmailInput()) {
    hideSugWrapper()
  } else {
    renderSugList()
    showSugWrapper()
  }
}

function hideSugWrapper() {
  // 做具体隐藏提示框的操作
  emailSugWrapper.style.display = 'none'
}

function showSugWrapper() {
  // 做具体显示提示框的操作
  emailSugWrapper.style.display = 'block'
}
