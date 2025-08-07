import { Graph } from "@antv/x6";
import { Stencil } from "@antv/x6-plugin-stencil";
import { Clipboard } from "@antv/x6-plugin-clipboard";
import { Selection } from "@antv/x6-plugin-selection";
import { Keyboard } from "@antv/x6-plugin-keyboard";
import { Transform } from "@antv/x6-plugin-transform";
import { Snapline } from '@antv/x6-plugin-snapline';
import { History } from '@antv/x6-plugin-history';
import { Export } from '@antv/x6-plugin-export';
import { nodes } from './nodes'
import actions from './actions/index.js';
import registerSetter, { getSetter, findSetter } from './setter/index.js';
import { BehaviorSubject } from "rxjs";
import { deepClone, saveJSON, addDynamicStyle, isDefinedAndNotNull } from "./utils/index.js";
import { convertImageUrlsToBase64 } from "./utils/imageToBase64.js";
import { nodeAnimation } from './nodes/node-animation.js';
import { NodeShape } from './shared/nodeShape';

export class WiringDesign {
  container;
  config;

  graph;
  stencil;

  // 操作栏
  actions = [];

  // 连接桩
  ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  }

  // 当前选中节点id
  selectNode$ = new BehaviorSubject(null);

  // 节点配置
  nodeSetter = new Map();

  // 动画
  _animation = [];

  constructor(container, config) {
    this.container = container;
    this.config = Object.assign({
      grid: true,
      autoResize: true,
      panning: true,
      mousewheel: true,
    }, config.config);

    this.initGraph()
    this.initStencil(config.stencilContainer, this.graph)
  }

  initGraph() {
    this.graph = new Graph({
      container: this.container,
      ...this.config,
    });

    // 图形变换
    this.graph.use(
      new Transform({
        resizing: true,
        rotating: true,
      })
    );

    // 开启复制粘贴功能
    this.graph.use(
      new Clipboard({
        enabled: true,
        // useLocalStorage: true, // 开起来生产环境会报错
      })
    );

    // 框选功能
    this.graph.use(
      new Selection({
        enabled: true,
        rubberband: false,
        strict: false,
        showEdgeSelectionBox: true,
        showNodeSelectionBox: true,
        multipleSelectionModifiers: 'alt',
        pointerEvents: 'none',
      })
    );

    // 开启快捷键
    this.graph.use(
      new Keyboard({
        enabled: true,
        global: true
      })
    );
    // 对齐线
    this.graph.use(
      new Snapline({
        enabled: true,
        sharp: true,
      })
    );

    // 开启历史功能（用于撤销操作）
    this.graph.use(
      new History({
        enabled: true
      })
    );

    // 导出功能
    this.graph.use(new Export());

    // 注册操作栏功能
    this.addActions(this.config.actions);

    // 注册节点动画
    this.addNodeAnimation(nodeAnimation(this));

    // 注册setter 
    this.addSetter(registerSetter(this));


    this.graph.on('node:click', (event) => {
      // const selectCell = this.graph.getSelectedCells();
      this.selectNode$.next(event.cell.id);
    });
    this.graph.on('node:change:size', (event) => {
      const node = event.node;
      const data = node ? node.getData() : {};
      const { width, height } = event.current;
      const setter = {
        ...data,
        setter: data.setter.map(item => {
          return {
            ...item,
            value: (item.key === 'width') ? width : (item.key === 'height') ? height : item.value
          };
        })
      }
      node.setData(setter);
      this.selectNode$.next(event.cell.id);
    });
  }

  initStencil(container, graph) {
    return new Promise((resolve) => {
      const stencil = new Stencil({
        target: graph,
        title: '物料',
        stencilGraphWidth: 200,
        stencilGraphHeight: 0,
      });
      resolve(stencil)
      this.stencil = stencil;
      container.appendChild(stencil.container);
      nodes(graph, this).forEach(item => {
        this.addAsset(item.groupName, item.nodes)
      })

      // localStorage 的node
      this.loadLocalStorageNode();
    })
  }

  loadLocalStorageNode(key = '', value = '') {
    const storeImage = localStorage.getItem('wd-assets-image');
    const storePath = localStorage.getItem('wd-assets-path');
    let imageNodes = JSON.parse(storeImage ? storeImage : '[]');
    let pathNodes = JSON.parse(storePath ? storePath : '[]');
    if (key === 'wd-assets-image') {
      imageNodes = [...imageNodes, value];
      localStorage.setItem(key, JSON.stringify(imageNodes));
    }
    if (key === 'wd-assets-path') {
      pathNodes = [...pathNodes, value];
      localStorage.setItem(key, JSON.stringify(pathNodes));
    }

    if (imageNodes.length > 0) this.addAsset('自定义图片', imageNodes.map(node => this.createImageNode(node)));
    if (pathNodes.length > 0) this.addAsset('自定义路径', pathNodes.map(node => this.createPathNode(node)));
  }

  addNodeAnimation(animate) {
    if (Array.isArray(animate)) {
      animate.forEach(item => this._animation.push(item));
      const cssText = animate.map(item => item.cssText);
      addDynamicStyle(cssText);
    } else {
      this._animation.push(animate);
      addDynamicStyle(animate.cssText);
    }
  }


  addAsset(groupName, asset) {
    const group = this.stencil.getGroup(groupName);
    if (group) {
      this.stencil.load(Array.isArray(asset) ? asset : [asset], groupName);
    } else {
      this.stencil.addGroup({
        name: groupName,
      })
      this.stencil.load(Array.isArray(asset) ? asset : [asset], groupName);
    }
  }

  /**
   * 添加操作栏功能
   * @param {*} actions 添加操作栏功能按钮
   */
  addActions(customActions = []) {
    // console.log('customActions >>:', customActions);
    const arr = [...actions, ...customActions];
    arr.sort((a, b) => {
      if (!a.index) a.index = 999;
      if (!b.index) b.index = 999;
      return a.index - b.index;
    })
    // console.log('arr >>:', arr);
    arr.forEach(action => {
      action.init(this.graph);
      this.actions.push(action);
    });
  }

  /**
   * 添加setter
   */
  addSetter(setter) {
    if (Array.isArray(setter)) {
      setter.forEach(item => {
        this.nodeSetter.set(item.shape, item.setter);
      });
    } else {
      this.nodeSetter.set(setter.shape, setter.setter);
    }
  }

  /**
   * 导出json数据
   * @param {Function} cb 回调函数
   * @param {Boolean} convertImages 是否将图片转换为base64
   */
  async exportJSON(cb = null, convertImages = true) {
    let json = this.graph.toJSON();
    json['bgColor'] = this.config.background.color;
    if (convertImages) {
      try {
        json = await convertImageUrlsToBase64(json);
      } catch (error) {
        console.error('转换过程中出错:', error);
      }
    }
    saveJSON(json, "wiring-design.json");
    cb && cb(json);
  }

  /**
   * 导出svg
   */
  exportSVG(fileName = 'wiring-design', options = {}) {
    this.graph.exportSVG(fileName, options);
  }

  /**
   * 导出png图片
   */
  exportPNG(fileName = 'wiring-design', options = {}) {
    this.graph.exportPNG(fileName, options);
  }

  /**
   * 导出jpeg图片
   */
  exportJPEG(fileName = 'wiring-design', options = {}) {
    this.graph.exportJPEG(fileName, options);
  }

  /**
   * 导入数据
   */
  importFromJSON = (file) => {
    if (file.type !== 'application/json') {
      alert('只能导入json类型文件!');
      return false;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (evt) => {
      var fileString = evt.target.result;
      if (typeof fileString === "string") {
        const fileJson = JSON.parse(fileString);
        this.graph.clearCells();
        if (fileJson.bgColor) {
          this.graph.drawBackground({
            color: fileJson.bgColor,
          });
          delete fileJson.bgColor;
        }
        this.graph.fromJSON(fileJson);
        this.graph.zoomToFit(); // 缩放画布以适应所有节点和边
        this.graph.centerContent();
      }
    };
    return false;
  }

  // 图片node
  createImageNode(imageUrl, label = '') {
    const shape = NodeShape.image;
    return this.graph.createNode({
      shape,
      width: 80,
      height: 36,
      imageUrl,
      label,
      attrs: {
        label: {
          refX: 0.5,
          refY: '100%',
          refY2: 4,
          textAnchor: 'middle',
          textVerticalAnchor: 'top',
        },
      },
      data: {
        ...getSetter(shape, this),
        update: (node, wd) => { // node 节点更新
          // console.log('node >>:', node);
          // 节点动画更新
          const data = node.getData();
          const animationName = data.setter.find(item => item.key === 'animationName')?.value;
          const markup = deepClone(node.getMarkup());
          const imageOfIds = markup.findIndex(item => item.tagName === shape);
          if (animationName) {
            markup.splice(imageOfIds, 1, {
              ...markup[imageOfIds],
              style: {
                animation: `${animationName} 1.5s infinite linear`,
              }
            })
          }
          node.setMarkup(markup);

          // 设置名称
          const label = findSetter(data.setter, 'label');
          if (isDefinedAndNotNull(label)) node.setLabel(label);

          // 更新图片地址
          const imageUrl = findSetter(data.setter, 'imageUrl');
          if (isDefinedAndNotNull(imageUrl)) {
            node.setAttrs({
              image: {
                'xlink:href': imageUrl
              },
            });

          }

          // 自定义样式
          const customCss = findSetter(data.setter, 'customCss', '');
          if (customCss) addDynamicStyle(customCss);
        }
      },
    })
  }
  // path node
  createPathNode(path) {
    return this.graph.createNode({
      shape: 'path',
      width: 25,
      height: 25,
      path,
      data: {
        ...getSetter('path', this),
        update: (node, wd) => { // node 更新
          // 组件动画更新
          const data = node.getData();
          const animationName = data.setter.find(item => item.key === 'animationName')?.value;
          const markup = deepClone(node.getMarkup());
          const pathOfIds = markup.findIndex(item => item.tagName === 'path');
          if (animationName) {
            markup.splice(pathOfIds, 1, {
              ...markup[pathOfIds],
              style: {
                animation: `${animationName} 1.5s infinite linear`,
              }
            })
          }
          node.setMarkup(markup);

          // 自定义样式
          const customCss = findSetter(data.setter, 'customCss', '');
          if (customCss) addDynamicStyle(customCss);
        }
      },
      ports: {
        ...this.graph.ports,
      },
    })
  }
}