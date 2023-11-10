// src/Three.ts
import * as THREE from "three";
import { Howl, Howler } from "howler";

export class Three {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private geometry: THREE.BufferGeometry;
  private material: THREE.Material;
  private mesh: THREE.Mesh;
  private audio: Howl;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.renderer = new THREE.WebGLRenderer();
    this.geometry = new THREE.BoxGeometry();
    this.material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh);
    this.camera.position.z = 5;
    this.audio = new Howl({
      src: ["assets/music.mp3"], // replace 'path/to/sound.mp3' with the actual path to your mp3 file in the 'assets' folder
      loop: true,
      volume: 0.5,
      //   spatialSound: true,
    });
    this.init();
  }

  private init(): void {
    document.body.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.render();
  }

  private render(): void {
    requestAnimationFrame(() => this.render());
    this.mesh.rotation.x += 0.01;
    this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  public addAudioListener(): void {
    window.addEventListener("scroll", () => {
      // Change audio properties based on scroll position
      const volume = window.scrollY / window.innerHeight;
      this.audio.volume(volume);
    });
  }
}
