import React, { Component, Children } from 'react';
import PIXI from 'pixi.js';

export default class Visualisation extends Component {
  
  constructor() {
    super();
    this.mousePositions = [];
    this.drawing = false;
  }

  componentDidMount() {
    this._objects = {};
    this.initRenderer();
    this.createInstances();
    this.renderFrame();
    if (this.props.staticFrame > 0) {
      for (var i = 0; i < this.props.staticFrame; i++) {
        //this.renderFrame();
      }
    }
  }

  componentWillUnmount() {
    this._objects = null;
    React.findDOMNode(this.refs.root).removeChild(this.renderer.view);
    this.renderer.destroy();
    this.renderer = null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width != this.props.width || nextProps.height != this.props.height) {
      this.renderer.resize(nextProps.width, nextProps.height);
    }
  }

  initRenderer() {
    this.renderer = PIXI.autoDetectRenderer(this.props.width, this.props.height, {
      antialias: true,
      backgroundColor: 0x000000
    });
    React.findDOMNode(this.refs.root).appendChild(this.renderer.view);
  }

  createInstances() {
    Children.forEach(this.props.children, (effect) => {
      const key = effect.key;
      if (!key) {
        console.warn('Key not found for effect');
        return;
      }
      if (!this._objects[key]) {
        const instance = new effect.type();
        this._objects[key] = instance;
      }
    });
  }

  renderFrame() {
    if (!this._objects) {
      return;
    }
    const stage = new PIXI.Container();
    const filters = [];
    Children.forEach(this.props.children, (effect) => {
      const obj = this._objects[effect.key];
      if (!obj) {
        return;
      }
      const result = obj.render({params: effect.props});
      if (result instanceof PIXI.DisplayObject) {
        if (!isNaN(effect.props.alpha)) {
          result.alpha = effect.props.alpha;
        }
        stage.addChild(result);
      } else if (typeof result.applyFilter == 'function') {
        filters.push(result);
      }
    });
    stage.filters = filters.length ? filters : null;
    stage.scale.x = 2;
    stage.scale.y = 2;

    // we need stageParent so fetching current mousePosition works
    // not sure if it is a bug or not??
    const stageParent = new PIXI.Container();
    stageParent.addChild(stage);
    this.renderer.render(stageParent);

    if (this.drawing) {
      const mousePosition = stage.toLocal(this.renderer.plugins.interaction.mouse.global);
      const lastMousePosition = this.mousePositions[this.mousePositions.length - 1];
      if (!lastMousePosition || !mousePosition.equals(lastMousePosition)) {
        this.mousePositions.push(mousePosition);
        this.props.onDrawLine(this.mousePositions);
      }
    }

    if (!this.props.staticFrame) {
      window.requestAnimationFrame(this.renderFrame.bind(this));
    }
  }

  handleMouseDown() {
    this.mousePositions = [];
    this.drawing = true;
  }

  handleMouseUp() {
    this.drawing = false;
    this.props.onDrawShape(this.mousePositions);
  }

  render() {
    return (
      <div ref="root" onMouseDown={this.handleMouseDown.bind(this)} onMouseUp={this.handleMouseUp.bind(this)}></div>
    );
  }
}
