import PIXI from 'pixi.js';

export default class BlurFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'blur',
				label: 'Blur',
				value: 0,
				min: 0,
				max: 30,
				step: 0.5,
			}
		];
	}

	constructor() {
		this.filter = new PIXI.filters.BlurFilter();
		this.filter.passes = 5;
	}

	render({ params: { blur } }) {
		if (!blur) {
			return false;
		}
		this.filter.blur = blur;
		return this.filter;
	}

}