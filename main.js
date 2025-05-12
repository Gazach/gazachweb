import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ 
  antialias: true,
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-canvas').appendChild(renderer.domElement);

// Sphere wireframe
const sphereGeometry = new THREE.SphereGeometry(1, 30, 22);
const wireframeGeometry = new THREE.WireframeGeometry(sphereGeometry);
const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff });
const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);

// Earth group
const earthGroup = new THREE.Object3D();
earthGroup.add(wireframe);
earthGroup.rotation.z = THREE.MathUtils.degToRad(45);
earthGroup.rotation.y = THREE.MathUtils.degToRad(55);
earthGroup.position.x = 1.5;
scene.add(earthGroup);

// Handle mobile scaling
function handleMobileResize() {
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    camera.position.z = 2;
    earthGroup.position.x = 0.8;
    earthGroup.scale.set(0.8, 0.8, 0.8);
  } else {
    camera.position.z = 3;
    earthGroup.position.x = 1.5;
    earthGroup.scale.set(1, 1, 1);
  }
}

// Initial mobile check
handleMobileResize();

// Resize handler
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  handleMobileResize();
});

// Animation and colors
const colorCyan = new THREE.Color(0x00ffff);
const colorWhite = new THREE.Color(0xffffff);
const colorGreen = new THREE.Color(0x90ee90);
const clock = new THREE.Clock();
const phaseDuration = 2.5;
const totalCycle = 4 * phaseDuration;

function animate() {
  requestAnimationFrame(animate);
  
  wireframe.rotation.y += 0.01;

  const t = clock.getElapsedTime() % totalCycle;
  const phase = Math.floor(t / phaseDuration);
  const localT = (t % phaseDuration) / phaseDuration;

  let fromColor, toColor;
  switch (phase) {
    case 0: fromColor = colorCyan;  toColor = colorWhite; break;
    case 1: fromColor = colorWhite; toColor = colorGreen; break;
    case 2: fromColor = colorGreen; toColor = colorWhite; break;
    case 3: fromColor = colorWhite; toColor = colorCyan; break;
  }

  wireframeMaterial.color.copy(fromColor).lerp(toColor, localT);
  renderer.render(scene, camera);
}

animate();