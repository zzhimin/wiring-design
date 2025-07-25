export const nodeAnimation = (graph) => {
  return [
    {
      label: '向上移动',
      value: 'toTopLoop',
      cssText: `@keyframes toTopLoop {
        0% {
            transform: translateY(15px); /* 初始位置 */
        }
        100% {
            transform: translateY(-15px); /* 向上移动20像素 */
        }
      }`
    },
    {
      label: '向下移动',
      value: 'toBottomLoop',
      cssText: `@keyframes toBottomLoop {
        0% {
            transform: translateY(-15px); /* 初始位置 */
        }
        100% {
            transform: translateY(15px); /* 向上移动20像素 */
        }
      }`
    },
    {
      label: '上下循环',
      value: 'upAndDownLoop',
      cssText: `@keyframes upAndDownLoop {
        0%, 100% {
          transform: translateY(3px); /* 初始位置 */
        }
        50% {
          transform: translateY(-3px); /* 向上移动20像素 */
        }
      }`
    }
  ]
}