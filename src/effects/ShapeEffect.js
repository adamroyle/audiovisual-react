import PIXI from 'pixi.js';

export default class ShapeEffect {

	getParamDefaults() {
		return [
			{
				name: 'color',
				label: 'Color',
			},
			{
				name: 'points',
				label: 'Shape Points',
			}
		];
	}

	render({ params: { color, points } }) {
		
		if (!points || !points.length) {
			return false;
		}

		const colorRaw = parseInt(color.substring(1), 16);

		const graphic = new PIXI.Graphics();

		graphic.beginFill(colorRaw, 1);
		graphic.drawPolygon(points);
		graphic.endFill();

		return graphic;
	}
}