const screenWidthMm = 286;
const eyesDistanceMm = 64;
const cameraFovRadians = 1.117; // estimate based on some measurement
const aspectRatio = 9/16;


let near = 0.7; 
const far = 1000;

let renderer;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, near, far );
const cubes = [];

function initScene() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight.position.set(0,1,1);
	scene.add( directionalLight );

	const directionalLight2 = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight2.position.set(-1,-1,1);
	scene.add( directionalLight2 );

	const directionalLight3 = new THREE.DirectionalLight( 0xffffff, 1 );
	directionalLight3.position.set(1,1,1);
	scene.add( directionalLight3 );

	const geometry = new THREE.BoxGeometry( 1, 1, 1000 );
	const positions = [	new THREE.Vector3(1,1,0),
						new THREE.Vector3(2,-3,0),
						new THREE.Vector3(3,-1,0),
						new THREE.Vector3(-2,3,0),
						new THREE.Vector3(-3,1,0),
					];

	// create and add cube for each position we need
	for(let i = 0; i < positions.length; i++){
		const material = new THREE.MeshLambertMaterial( { color: [0x00ff00, 0xff0000, 0x0000ff][i%3] } );
		const cube = new THREE.Mesh( geometry, material );
		Object.assign(cube.position, positions[i]);
		scene.add(cube);
		cubes.push(cube);
	}

	camera.position.z = 0;
}


const now = new Date();
let rollingAverages = Array(15).fill({x: 0, y: 0, z: 1});
function animate(){
	const t = new Date() - now;

	let newNear = near;

	// cubes[0].rotation.z += 0.01;

	let distanceToCamera = unitDistanceToCamera();
	let distancesToCenter = unitDistancesToCenter();

	rollingAverages.splice(-1);
	rollingAverages = [	{
							x: distancesToCenter.x, 
							y: distancesToCenter.y, 
							z: distanceToCamera
						}, 
						...rollingAverages ];

	camera.position.x = rollingAverages.reduce
	((average, current) => average + current.x / rollingAverages.length, 0);

	camera.position.y = -rollingAverages.reduce
	((average, current) => average + current.y / rollingAverages.length, 0) * aspectRatio;

	camera.position.z = rollingAverages.reduce
	((average, current) => average + current.z / rollingAverages.length, 0);

	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}

initScene();
animate();
