import { Shape } from '@antv/x6';
import { getSetter, findSetter } from '../setter/index.js';
import { deepClone } from '../utils/index.js';
import { NodeShape } from '../shared/nodeShape.js';
// 创建自定义文本
function creatCustomText(graph, wd) {
  const shape = NodeShape.customText;
  Shape.HTML.register({
    shape: shape,
    width: 80,
    height: 36,
    effect: ['data'],
    html(cell) {
      const data = cell.getData();
      // console.log('custom-text data >>:', data);
      const div = document.createElement('div');
      const animationName = data.setter.find(item => item.key === 'animationName')?.value;
      div.style.cssText = `
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: ${data.setter.find(item => item.key === 'color')?.value || '#333333'};
        font-size: ${data.setter.find(item => item.key === 'fontSize')?.value + 'px' || '16px'};
        font-weight: ${data.setter.find(item => item.key === 'fontWeight')?.value || 'normal'};
        background-color: ${data.setter.find(item => item.key === 'backgroundColor')?.value || 'transparent'};
        animation: ${animationName} 1.5s infinite linear;
      `;
      div.textContent = data.setter.find(item => item.key === 'content')?.value || '文字';
      return div;
    }
  })
  return graph.createNode({
    shape,
    data: getSetter(shape, wd),
  });
}

function creatCustomSvg(graph, wd) {
  const commonSvgArr = [
    'M502.4 427.3L508.5 437.9 514.7 427.3z',
    'M1014.9373 382.54745L1006.1973 391.28748 M1006.2083 382.54745L1014.9482 391.28748',
    'M102.85152 158.91753L105.7884 158.91753 M102.85152 160.45212L105.7884 160.45212',
    'M104.25049 156.66153L104.25049 161.15944 M103.1921483 158.85757a1.0847917 1.0847917 0 1 0 2.1695834 0a1.0847917 1.0847917 0 1 0 -2.1695834 0z',
    'M103.01617 158.34259L103.01617 161.06779 M101.56097 161.01488L104.49784 161.01488 M102.09013 161.888L103.94221 161.888 M102.59284 162.78758L103.43951 162.78758',
    'M100.89715 152.76591h2.6193748v5.5906453h-2.6193748z',
    'M502.3 230.8L508.4 224.7 514.5 230.8 M502.3 238.4L508.4 232.2 514.5 238.4',
    'M102.0610083 156.89528a1.0847917 1.0847917 0 1 0 2.1695834 0a1.0847917 1.0847917 0 1 0 -2.1695834 0z M103.11935 154.96382L103.11935 158.98549 M104.2306 156.89528L106.45309 156.89528 M104.7333 156.10153L105.1831 157.58319 M105.63289 156.10153L106.18851 157.58319',
    'm 101.56401,159.38017 h 2.00911'
  ]

  return commonSvgArr.reduce((acc, path) => {
    const svg = graph.createNode({
      shape: 'path',
      width: 25,
      height: 25,
      path,
      data: {
        ...getSetter('path', wd),
        update: (node, wd) => { // node 更新
          // 组件动画更新
          const data = node.getData();
          const animationName = data.setter.find(item => item.key === 'animationName')?.value;
          const markup = deepClone(node.getMarkup());
          const pathOfIds = markup.findIndex(item => item.tagName === 'path');
          markup.splice(pathOfIds, 1, {
            ...markup[pathOfIds],
            style: {
              animation: `${animationName} 1.5s infinite linear`,
            }
          })
          node.setMarkup(markup);
        }
      },
      ports: {
        ...graph.ports,
      },
    })
    acc.push(svg);
    return acc;
  }, [])
}

// 创建自定义最新值部件
function createLatestValueText(graph, wd) {
  const shape = NodeShape.latestValue;
  Shape.HTML.register({
    shape,
    width: 80,
    height: 36,
    effect: ['data'],
    html(cell) {
      const data = cell.getData();
      // console.log('data >>:', data);
      const div = document.createElement('div');
      const divTitle = document.createElement('div');
      const divValue = document.createElement('div');
      const divUnit = document.createElement('div');
      const animationName = findSetter(data.setter, 'animationName');
      div.style.cssText = `
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: ${findSetter(data.setter, 'justify', 'flex-start')};
        align-items: center;
        background-color: ${findSetter(data.setter, 'backgroundColor', 'transparent')};
        animation: ${animationName} 1.5s infinite linear;
      `;
      divTitle.textContent = findSetter(data.setter, 'title');
      divTitle.style.cssText = `
        color: ${findSetter(data.setter, 'titleColor', '#333')};
        font-size: ${findSetter(data.setter, 'titleFontSize', '16px')};
        font-weight: ${findSetter(data.setter, 'titleFontWeight', 'normal')};
        margin-right: 5px;
      `;
      divValue.textContent = '最新值';
      divValue.style.cssText = `
        color: ${findSetter(data.setter, 'valueColor', '#333')};
        font-size: ${findSetter(data.setter, 'valueFontSize', '16px')};
        font-weight: ${findSetter(data.setter, 'valueFontWeight', 'normal')};
        margin-right: 5px;
      `;
      divUnit.textContent = findSetter(data.setter, 'unit');
      divUnit.style.cssText = `
        color: ${findSetter(data.setter, 'unitColor', '#333')};
        font-size: ${findSetter(data.setter, 'unitFontSize', '16px')};
        font-weight: ${findSetter(data.setter, 'unitFontWeight', 'normal')};
      `;

      div.appendChild(divTitle);
      div.appendChild(divValue);
      div.appendChild(divUnit);
      return div;
    }
  })
  return graph.createNode({
    shape,
    data: getSetter(shape, wd),
  });
}




export const nodes = (graph, wd) => {


  return [
    {
      groupName: '通用',
      nodes: [
        creatCustomText(graph, wd),
        ...creatCustomSvg(graph, wd),
      ]
    },
    {
      groupName: '动态值',
      nodes: [
        createLatestValueText(graph, wd),
      ]
    },
  ]
}