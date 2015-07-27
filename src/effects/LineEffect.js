
import PIXI from 'pixi.js';

export default class LineEffect {

	getParamDefaults() {
		return [
			{
				name: 'lineThickness',
				label: 'Line Thickness',
			},
			{
				name: 'color',
				label: 'Color',
			},
			{
				name: 'points',
				label: 'Line Points',
			}
		];
	}

	render({ params: { lineThickness, color, points } }) {
		
		if (!points || !points.length) {
			return false;
		}

		const colorRaw = parseInt(color.substring(1), 16);

		const graphic = new PIXI.Graphics();

		graphic.lineStyle(lineThickness, colorRaw, 1);
		graphic.moveTo(points[0].x, points[0].y);
		for (let i = 1; i < points.length; i++) {
			graphic.lineTo(points[i].x, points[i].y);
		}

		// workaround for lineTo regression
		// https://github.com/GoodBoyDigital/pixi.js/issues/1892
		if (graphic.currentPath && graphic.currentPath.shape) {
	        graphic.currentPath.shape.closed = false;
	    }
		
		return graphic;
	}
}