import PIXI from 'pixi.js';

export default class RGBSplitFilter {
	
	getParamDefaults() {
		return [
			{
				name: 'distance',
				label: 'Distance',
				value: 0,
				min: 0,
				max: 100,
				step: 0.5,
			}
		];
	}

	constructor() {
		const filter = new PIXI.filters.RGBSplitFilter();
		filter.green.x = 0;
		filter.green.y = 0;
		filter.red.y = 0;
		filter.red.x = 0;
		filter.blue.x = 0;
		filter.blue.y = 0;
		this.filter = filter;
	}

	render({ params: { distance } }) {
		if (!distance) {
			return false;
		}
		this.filter.red.x = distance;
		this.filter.blue.x = -distance;
		return this.filter;
	}

}