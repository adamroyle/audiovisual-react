import PIXI from 'pixi.js';

export default class TwistFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'angle',
				label: 'Angle',
				value: 0,
				min: 0,
				max: 15,
				step: 0.1,
			}
		];
	}

	constructor() {
		this.filter = new PIXI.filters.TwistFilter();
	}

	render({ params: { angle } }) {
		if (!angle) {
			return false;
		}
		this.filter.angle = angle;
		return this.filter;
	}

}