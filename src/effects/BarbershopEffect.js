import PIXI from 'pixi.js';

export default class BarbershopEffect {

	getParamDefaults() {
		return [
			{
				name: 'lineThickness',
				label: 'Line Thickness (px)',
				value: 10,
				min: 10,
				max: 25,
				step: 1,
			},
			{
				name: 'gapThickness',
				label: 'Gap Thickness (px)',
				value: 2,
				min: 0.5,
				max: 20,
				step: 0.5,
			},
			{
				name: 'speed',
				label: 'Speed',
				value: 20,
				min: -100,
				max: 100,
				step: 1,
			},
			{
				name: 'rotation',
				label: 'Rotation',
				value: 0,
				min: -200,
				max: 200,
				step: 1,
			}
		];
	}

	constructor() {
		this.offset = 0;
	}

	render({ params: { lineThickness, gapThickness, rotation, speed } }) {
		const graphics = new PIXI.Graphics();
		const width = 320, height = 240;

		graphics.pivot.x = width / 2;
		graphics.pivot.y = width / 2;
		graphics.rotation = Math.PI * (Math.round(rotation) / 100);

		this.offset = (this.offset + speed) % (lineThickness + gapThickness);

		const colWidth = lineThickness + gapThickness;
        const numCols = width / (colWidth);
        const offset = this.offset + colWidth;

        graphics.lineStyle(lineThickness, 0xFFFFFF);
        for (let i = -numCols; i < numCols * 2; i++) {
            graphics.moveTo(i * colWidth + offset, -height);
            graphics.lineTo(i * colWidth + offset, height * 3);
        }
        
        return graphics;
	}
}