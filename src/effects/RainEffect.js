import PIXI from 'pixi.js';

export default class RainEffect {

	getParamDefaults() {
		return [
			{
				name: 'lineThickness',
				label: 'Line Thickness (px)',
				value: 2,
				min: 0.1,
				max: 50,
				step: 0.5,
			},
			{
				name: 'gravity',
				label: 'Gravity',
				value: 5,
				min: 1,
				max: 10,
				step: 0.2,
			},
			{
				name: 'wind',
				label: 'Wind',
				value: 0,
				min: -10,
				max: 10,
				step: 0.5,
			},
			{
				name: 'windVariation',
				label: 'Wind Variation',
				value: 0.5,
				min: 0,
				max: 5,
				step: 0.1,
			},
			{
				name: 'lineLength',
				label: 'Line Length',
				value: 20,
				min: 5,
				max: 100,
				step: 1,
			}
		];
	}

	constructor() {
		this.droplets = [];
	}

	render({ params }) {
		const container = new PIXI.Container();
		
		// spawn new droplets
		for (let i = 0; i < 5; i++) {
			this.droplets.push(new Droplet(params));
		}

		// render all the droplets to our container
		this.droplets.forEach(droplet => {
			const graphic = droplet.render(params);
			container.addChild(graphic);
		});

		// kill the old droplets for the next render
		this.droplets = this.droplets.filter(droplet => !droplet.dead);

		return container;
	}
}

const KINECT_WIDTH = 320;
const KINECT_HEIGHT = 240;

const colors = ['#3165A0','#27A3A5','#44C7DD','#40EC9E','#F9D821'];
const rawColors = colors.map((hex) => parseInt(hex.substring(1), 16));

function randomBetween(start, end) {
	const actualRange = Math.abs(end - start);
    return start + Math.random() * actualRange;
}

function getRandomColor() {
	const index = Math.round(randomBetween(0, rawColors.length - 1));
	return rawColors[index];
}

class Droplet {

	constructor(params) {
		this.windOffset = randomBetween(-params.windVariation, params.windVariation);
		this.moveX = Math.floor(randomBetween(0, KINECT_WIDTH + this.windOffset * 2) - this.windOffset * 2);
		this.lastX = this.moveX;
		this.moveY = this.lastY = 0;
		this.life = 0;
		this.dead = false;
		this.splash = false;
		this.gravityOffset = randomBetween(0.8, 1.2);

		this.shape = new PIXI.Graphics();
		this.shape.lineStyle(params.lineThickness, getRandomColor(), 1);
		this.shape.moveTo(0, 0);
		this.shape.lineTo(0, -params.lineLength);
	}

	changeToSplash(params) {
		this.shape.clear();
		this.shape.lineStyle(params.lineThickness, getRandomColor(), 1);
		this.shape.moveTo(0,0);
		this.shape.lineTo(0, -10);
		this.shape.moveTo(0,0);
		this.shape.lineTo(-8, -5);
		this.shape.moveTo(0,0);
		this.shape.lineTo(8, -5);

		this.shape.scale.x = 0.5;
		this.shape.scale.y = 1;

		this.life = 0;
		this.splash = true;
	}

	render(params) {

		if (this.splash) {

			this.shape.scale.x += 0.5;
			this.shape.scale.y -= 0.1;
			this.shape.alpha -= 0.2;
			
			if (++this.life > 8) {
				this.dead = true;
			}

		} else {
			this.moveX += params.wind + this.windOffset;
			this.moveY += params.gravity + this.gravityOffset;

			this.shape.rotation = Math.atan2( this.moveY - this.lastY, this.moveX - this.lastX ) - Math.PI/2;

			if (this.moveY > KINECT_HEIGHT) {
				this.moveY = KINECT_HEIGHT;
			}

			this.shape.x = this.moveX;
			this.shape.y = this.moveY;

			if (this.moveX < -this.windOffset * 2 || this.moveX > KINECT_WIDTH + this.windOffset * 2) {
				this.dead = true;
			} else if (this.moveY >= KINECT_HEIGHT) {
				this.changeToSplash(params);
			} else if (params.avoid && params.avoid.length) {
				const polygon = new PIXI.Polygon(params.avoid);
				const { x, y } = this.shape.position;
				if (polygon.contains(x, y)) {
					this.changeToSplash(params);
				}
			}

			this.lastX = this.moveX;
			this.lastY = this.moveY;

		}

		return this.shape;
	}

}