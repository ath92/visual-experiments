function Tadpole(numberOfSpheres = 5){
	this.spheres = [];

	for (let i = 0; i < numberOfSpheres; i++) {
		const geometry = new THREE.SphereGeometry((numberOfSpheres - i) / 5, 16, 16);
		const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
		const sphere = new THREE.Mesh(geometry, material);

		this.spheres.push(sphere);
	}
}

/**
* @param position: THREE.Vector3
**/
Tadpole.prototype.setPosition = function(position, swing = 0, direction = new THREE.Vector3(0, 0, 0.2)) {
	this.spheres.forEach((sphere, index) => {
		const tailDistance = direction.clone().normalize().multiplyScalar(-1 * (index - (index ** .07)));
		const orthogonal = direction.clone().normalize().applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.5 * Math.PI);
		const tailSwingOffset = orthogonal.multiplyScalar(0.2 * (index ** 2) * swing);
		Object.assign(sphere.position, (position.clone().add(tailDistance).add(tailSwingOffset)));
	});
}

/**
* @param scene: THREE.Scene
**/
Tadpole.prototype.addToScene = function(scene) {
	this.spheres.forEach(sphere => scene.add(sphere));
}

Tadpole.prototype.getHeadPosition = function() {
	return this.spheres[0].position.clone();
}