var globe = document.querySelector("#globe");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, globe.clientWidth / globe.clientHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    alpha: true
});

renderer.setSize(globe.clientWidth, globe.clientHeight);
globe.appendChild(renderer.domElement);

var geometry = new THREE.SphereGeometry(0.5, 16, 8);
var material = new THREE.MeshBasicMaterial({
    color: '#fff8df',
    wireframe: true
});
const sphere = new THREE.Mesh(geometry, material);

var curve = new THREE.EllipseCurve(0, 0, 2, 2, 0, 2 * Math.PI, false, 0);

var points = curve.getPoints(50);
var geometry = new THREE.BufferGeometry().setFromPoints(points);

var material = new THREE.LineBasicMaterial({ color: '#fff8df' });

const ellipse = new THREE.Line(geometry, material);
const ellipse2 = new THREE.Line(geometry, material);

ellipse.add(sphere);
sphere.position.x = 2;
sphere.rotateX(Math.PI / 180 * 90);

ellipse.rotateX(Math.PI / 180 * 105);
ellipse.rotateY(Math.PI / 180 * 10);

ellipse2.rotateY(Math.PI / 180 * 105);
ellipse2.rotateX(Math.PI / 180 * 10);

scene.add(ellipse);
scene.add(ellipse2);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    ellipse.rotation.z += 0.005;

    ellipse2.rotation.z += 0.005;
    ellipse2.rotation.y += 0.001;

    sphere.rotation.z += 0.001;
    renderer.render(scene, camera);
};

animate();
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = globe.clientWidth / globe.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(globe.clientWidth, globe.clientHeight);
}