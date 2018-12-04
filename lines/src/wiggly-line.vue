<template>
	<path fill="none" stroke="black" :d="path" />
</template>

<script>

const smol = .0000000001;

export default {
	props: {
		y: {
			type: Number,
			required: true,
		},
		width: {
			type: Number,
			required: true,
		},
		height: {
			type: Number,
			required: true,
		},
		segments: {
			type: Number,
			default: 50,
		},
		mouseX: {
			type: Number,
		},
		mouseY: {
			type: Number,
		}
	},
	computed: {
		path() {
			let pathString = "";
			for(let i = 0; i < this.segments; i++){
				const x = this.width / this.segments * (i);
				const xDiff = this.mouseX - x;
				const yDiff = this.mouseY - this.y;
				const spread = (this.y - (window.innerHeight / 2) - 0.5) * 1;
				const power = Math.pow(this.mouseX / window.innerWidth, .72);
				const yAdd = (yDiff / window.innerHeight) * Math.pow(xDiff * xDiff + yDiff * yDiff, power) + spread;
				pathString += `${i == 0 ? 'M' : 'L'} ${x},${(this.y + yAdd)}\r\n`;
			}
			return pathString;
		}
	}
}

</script>