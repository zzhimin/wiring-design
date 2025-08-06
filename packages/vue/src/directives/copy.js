import { message } from 'ant-design-vue';
const copy = {
  mounted(el, binding) {
    const value = binding.value
    el.copyValue = value

    // 将点击处理函数直接定义在指令内部
    el.handleClick = function () {
      const input = document.createElement('input')
      input.value = el.copyValue
      document.body.appendChild(input)
      input.select()
      document.execCommand('Copy')
      document.body.removeChild(input)

      // 复制成功提示
      message.success('复制成功')
    }

    el.addEventListener('click', el.handleClick)
  },
  updated(el, binding) {
    const value = binding.value
    el.copyValue = value
  },
  beforeUnmount(el) {
    el.removeEventListener('click', el.handleClick)
  }
}

export default copy;
