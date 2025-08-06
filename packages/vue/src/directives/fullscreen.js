// 全屏指令
const fullscreen = {
  mounted(el, binding) {
    if (binding.value) {
      el.requestFullscreen();
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        el.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  }
};

export default fullscreen;
