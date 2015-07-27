import PIXI from 'pixi.js';

const IMAGE = require('./assets/001.jpg');

export default class DisplacementFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'scale',
				label: 'Displacement',
				value: 0,
				min: 0,
				max: 1000,
				step: 10,
			}
		];
	}

	constructor() {
		this.filter = new PIXI.filters.DisplacementFilter(PIXI.Sprite.fromImage(IMAGE));
	}

	render({ params: { scale } }) {
		if (!scale) {
			return false;
		}
		this.filter.scale.x = scale;
		this.filter.scale.y = scale;
		return this.filter;
	}

}