import PIXI from 'pixi.js';

export default class PixelateFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'size',
				label: 'Pixel Size',
				value: 0,
				min: 0,
				max: 100,
				step: 1,
			}
		];
	}

	constructor() {
		this.filter = new PIXI.filters.PixelateFilter();
	}

	render({ params: { size } }) {
		if (!size) {
			return false;
		}
		this.filter.size.x = size;
		this.filter.size.y = size;
		return this.filter;
	}

}