import PIXI from 'pixi.js';
import KaleidoscopeFilterFragment from './KaleidoscopeFilterFragment.glsl';

export default class KaleidoscopeFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'sides',
				label: 'Sides',
				value: 5,
				min: 0,
				max: 30,
				step: 1,
			}
		];
	}

	constructor() {
		this.filter = new PIXI.AbstractFilter(
            // vertex shader
            null,
            // fragment shader
            KaleidoscopeFilterFragment,
            // custom uniforms
            {
                sides: { type: '1f', value: 5.0 }
            }
        );
	}

	render({ params: { sides } }) {
		if (!sides) {
			return false;
		}
		this.filter.uniforms.sides.value = sides;
		return this.filter;
	}

}