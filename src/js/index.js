import "normalize.css";
import "@/css/index.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GLStructure } from "./GLStructure";
import { evt } from "./plugins";

let canvas = document.getElementById("app-canvas");
let wrapper = document.getElementById("app-wrapper");

class GLApp extends GLStructure {
  constructor(container, canvas) {
    super(container, canvas);
    this.init();
  }
  loadAssets() {
    let manager = new THREE.LoadingManager();
    let loader = new GLTFLoader(manager);
    loader.load("/static/models/cube.glb", (gltf) => {
      console.log("LOADED:", gltf);
      let cube = gltf.scene.children[0];
      cube.material = new THREE.MeshNormalMaterial();
      cube.scale.setScalar(0.5);
      cube.position.x += 2;
      this.scene.add(gltf.scene);
    });
  }
  init() {
    let cubeGeo = new THREE.BoxBufferGeometry();
    let cubeMat = new THREE.MeshNormalMaterial();
    let cubeMesh = new THREE.Mesh(cubeGeo, cubeMat);
    this.cube = cubeMesh;
    this.scene.add(cubeMesh);
    this.loadAssets();
    this.addEvents();
  }
  addEvents() {
    evt.on("resize", this.onResize);
    evt.on("tick", this.tick);
  }
  update() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
  }
}

new GLApp(wrapper, canvas);
