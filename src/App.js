import React, { Component } from 'react';
import Visualisation from './components/Visualisation';
import BarbershopEffect from './effects/BarbershopEffect';
import RainEffect from './effects/RainEffect';
import ShapeEffect from './effects/ShapeEffect';
import LineEffect from './effects/LineEffect';
import RGBSplitFilter from './filters/RGBSplitFilter';
import BlurFilter from './filters/BlurFilter';
import TwistFilter from './filters/TwistFilter';
import PixelateFilter from './filters/PixelateFilter';
import KaleidoscopeFilter from './filters/KaleidoscopeFilter';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 420,
      key: 0,
      lineThickness: 5,
      gravity: 5,
      windVariation: .5,
      rotation: 0,
      wind: 0,
      rgbSplit: 0,
      twist: 0,
      blur: 0,
      pixelate: 1,
      shapePoints: [],
      shapeAlpha: 0.5,
      speed: 0.2,
      gapThickness: 10,
      kaleidoscopeSides: 5,
    };
  }
  handleSliderChange(name, event) {
    this.setState({[name]: parseFloat(event.target.value)});
  }
  handleApplyParams() {
    this.setState({key: this.state.key + 1});
  }
  handleClickRenderFrame() {
    this.refs.canvas.renderFrame();
  }
  handleDrawShape(points) {
    this.setState({shapePoints: points, linePoints:[]});
  }
  handleDrawLine(points) {
    this.setState({linePoints: points, shapePoints:[]});
  }
  render() {
    return (
      <div>
        <Visualisation onDrawLine={this.handleDrawLine.bind(this)} onDrawShape={this.handleDrawShape.bind(this)} ref="canvas" key={'vis1_' + this.state.key} width={320 * 2} height={240 * 2}>
          <RainEffect key="cmp67"
            lineThickness={this.state.lineThickness}
            gravity={this.state.gravity}
            wind={this.state.wind}
            windVariation={this.state.windVariation}
            lineLength={20}
            avoid={this.state.shapePoints} />
          <ShapeEffect key="cmp98" color="#FFFFFF" alpha={this.state.shapeAlpha} points={this.state.shapePoints} />
          <LineEffect key="cmp99" color="#FFFFFF" lineThickness={this.state.lineThickness} alpha={this.state.shapeAlpha} points={this.state.linePoints} />
          <BlurFilter key="cmp70" blur={this.state.blur} />
          <TwistFilter key="cmp69" angle={this.state.twist} />
          <PixelateFilter key="cmp90" size={this.state.pixelate} />
          <RGBSplitFilter key="cmp68" distance={this.state.rgbSplit} />
          <KaleidoscopeFilter key="cmp61" sides={this.state.kaleidoscopeSides} />
          
          <BarbershopEffect key="cmp23"
            lineThickness={this.state.lineThickness}
            gapThickness={this.state.gapThickness}
            speed={this.state.speed}
            rotation={this.state.rotation} />
          {/*<BarbershopEffect key="cmp24"
            lineThickness={10}
            gapThickness={10}
            speed={-this.state.speed}
            rotation={-this.state.rotation}          />
          <BlurFilter key="cmp56"
            amount={10}          />*/}
        </Visualisation>
        <label style={styles.sliderLabel}>Line Thickness</label>
        <input type="range" min="1" max="30" value={this.state.lineThickness} onChange={this.handleSliderChange.bind(this, 'lineThickness')} />
        <label style={styles.sliderLabel}>Gap Thickness</label>
        <input type="range" min="1" max="30" value={this.state.gapThickness} onChange={this.handleSliderChange.bind(this, 'gapThickness')} />
        <label style={styles.sliderLabel}>Speed</label>
        <input type="range" min="-10" max="10" step="0.2" value={this.state.speed} onChange={this.handleSliderChange.bind(this, 'speed')} />
        <label style={styles.sliderLabel}>Rotation</label>
        <input type="range" min="-200" max="200" step="0.2" value={this.state.rotation} onChange={this.handleSliderChange.bind(this, 'rotation')} />
        <label style={styles.sliderLabel}>Kaleidoscope Sides</label>
        <input type="range" min="0" max="30" step="1" value={this.state.kaleidoscopeSides} onChange={this.handleSliderChange.bind(this, 'kaleidoscopeSides')} />
        <label style={styles.sliderLabel}>Gravity</label>
        <input type="range" min="1" max="10" step="0.2" value={this.state.gravity} onChange={this.handleSliderChange.bind(this, 'gravity')} />
        <label style={styles.sliderLabel}>Wind</label>
        <input type="range" min="-10" max="10" step="0.5" value={this.state.wind} onChange={this.handleSliderChange.bind(this, 'wind')} />
        <label style={styles.sliderLabel}>Wind Variation</label>
        <input type="range" min="0" max="5" step="0.1" value={this.state.windVariation} onChange={this.handleSliderChange.bind(this, 'windVariation')} />
        <label style={styles.sliderLabel}>RGB Split</label>
        <input type="range" min="0" max="100" value={this.state.rgbSplit} onChange={this.handleSliderChange.bind(this, 'rgbSplit')} />
        <label style={styles.sliderLabel}>Twist</label>
        <input type="range" min="0" max="15" step="0.1" value={this.state.twist} onChange={this.handleSliderChange.bind(this, 'twist')} />
        <label style={styles.sliderLabel}>Blur</label>
        <input type="range" min="0" max="30" step="0.5" value={this.state.blur} onChange={this.handleSliderChange.bind(this, 'blur')} />
        <label style={styles.sliderLabel}>Pixelate</label>
        <input type="range" min="0" max="100" step="1" value={this.state.pixelate} onChange={this.handleSliderChange.bind(this, 'pixelate')} />
        <label style={styles.sliderLabel}>Shape Alpha</label>
        <input type="range" min="0" max="1" step="0.01" value={this.state.shapeAlpha} onChange={this.handleSliderChange.bind(this, 'shapeAlpha')} />
        
        <button onClick={this.handleApplyParams.bind(this)}>Apply Params</button>
        <label style={styles.sliderLabel}>Width</label>
        <input type="number" value={this.state.width} onChange={this.handleSliderChange.bind(this, 'width')} />
        <button onClick={this.handleClickRenderFrame.bind(this)}>Render Single Frame</button>
        
      </div>
    );
  }
}

const styles = {
  sliderLabel: {
    display: 'block',
    marginTop: 10,
  }
};