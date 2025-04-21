import * as THREE from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { CameraControls } from "../CameraControls.js";

export function render_scene_1(camera, renderer, scene, canvas) {
  // lighting
  {
    const color = 0xffffff;
    const intensity = 2;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 10, 0);
    light.target.position.set(-5, 0, 0);
    scene.add(light);
    scene.add(light.target);
  }

  {
    const light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
  }

  {
    // this is the inne cell wall model
    const gltfLoader = new GLTFLoader();
    const url = "Models/cell_outer/cell_outer.gltf";
    gltfLoader.load(url, (gltf) => {
      const cell_inner_wall = gltf.scene;
      cell_inner_wall.rotation.x = 0.45;
      cell_inner_wall.rotation.y = 2.25;
      cell_inner_wall.position.set(1, 7.1, 0);
      scene.add(cell_inner_wall);
    });
  }

  // arrow

  const dir = new THREE.Vector3(8, -3, -3);
  const origin = new THREE.Vector3(1, 12.5, 0);
  const length = 1;
  const hex = 0x54c7ff;

  const arrowHelper = new THREE.ArrowHelper(dir, origin, length, hex);
  arrowHelper.setLength(2, 2, 2);
  scene.add(arrowHelper);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }

    return needResize;
  }

  // camera controller to allow for user to the rotate the camera by clicking and dragging
  const controls = new CameraControls(camera, canvas); // getting warning about not being used. shouldn't be an issue as we just need to instantiate the class

  const clock = new THREE.Clock();

  function animate_arrow() {
    arrowHelper.rotation.y += 0.01;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    controls.enable();
    animate_arrow();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
