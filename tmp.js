const nearDist = 0.1;
const farDist = 10000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	55,
	window.innerWidth / window.innerHeight,
	nearDist,
	farDist
);
camera.position.x = farDist * -2;
camera.position.z = 500;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#e8a82b"); 
renderer.setPixelRatio(window.devicePixelRatio); 
renderer.setSize(window.innerWidth, window.innerHeight);
document.querySelector("#canvas-wrapper").appendChild(renderer.domElement);

// Render
const render = () => {
	requestId = requestAnimationFrame(render);

	// Camera animation
	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (mouseY * -1 - camera.position.y) * 0.05;
	camera.lookAt(scene.position);

	const t = Date.now() * 0.001;
	const rx = Math.sin(t * 0.6) * 0.5;
	const ry = Math.sin(t * 0.3) * 0.5;
	const rz = Math.sin(t * 0.2) * 0.5;
	group.rotation.x = rx;
	group.rotation.y = ry;
	group.rotation.z = rz;
	textMesh.rotation.x = rx;
	textMesh.rotation.y = ry;
	textMesh.rotation.z = rx; // :) 

	renderer.render(scene, camera);
};
render();


const resizeCanvas = () => {
camera.aspect = window.innerWidth / window.innerHeight;
camera.updateProjectionMatrix();
renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", resizeCanvas, false);




// start render
function start() {
    render();
}

// stop render
function stop() {
   window.cancelAnimationFrame(requestId);
   requestId = undefined;
}

// observer + log + stop render
const statusElem = document.querySelector('.status');

const onScreen = new Set();
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      onScreen.add(entry.target);
      start();
      console.log('render has been started');
    } else {
      onScreen.delete(entry.target);
      stop();
      console.log('render has been halted');
        }     
  });
  statusElem.textContent = onScreen.size
    ? `on screen: ${[...onScreen].map(e => e.textContent).join(', ')}`
    : 'none';
});

document.querySelectorAll('.test').forEach(elem => intersectionObserver.observe(elem));



