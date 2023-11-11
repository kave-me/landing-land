import * as T from 'three'
// @ts-ignore
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import dat from 'dat.gui'

export class Three {
    private scene!: T.Scene;
    private camera!: T.PerspectiveCamera;
    private renderer!: T.WebGLRenderer;
    private controls!: OrbitControls;

    private time = 0;
    private debug = true;
    private gui !: dat.GUI;

    constructor(canvas: HTMLCanvasElement) {
        this.init(canvas);
    }

    init(canvas: HTMLCanvasElement) {
        this.scene = new T.Scene();
        this.camera = new T.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        this.camera.position.set(0, 0, 5); // Set an initial camera position

        this.renderer = new T.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
        });

        this.setting(); // Initialize general settings
        this.setupControls(); // Initialize controls
        this.render(); // Start rendering loop
    }

    render = () => {
        this.time += 1;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        window.requestAnimationFrame(this.render);

        this.controls.update();

        if (this.debug) {
            // console.log(this.time);
        }

        this.renderer.render(this.scene, this.camera);
    }

    setting() {
        this.renderer.setClearColor(0xff0000,1)

    }
    private setupControls() {
        // Initialize OrbitControls
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 1.0;

        if (this.debug) {
            this.setupDebugControls();
        }
    }
    private setupDebugControls() {
        this.gui = new dat.GUI();

        const cameraFolder = this.gui.addFolder('Camera');
        cameraFolder.add(this.camera.position, 'x', -10, 10);
        cameraFolder.add(this.camera.position, 'y', -10, 10);
        cameraFolder.add(this.camera.position, 'z', -10, 10);
        cameraFolder.open();

        // Add more debug controls for OrbitControls or other elements
        const controlFolder = this.gui.addFolder('OrbitControls');
        controlFolder.add(this.controls, 'enableDamping');
        controlFolder.add(this.controls, 'dampingFactor', 0.01, 0.1);
        controlFolder.add(this.controls, 'rotateSpeed', 0.1, 2.0);
        controlFolder.open();

    }


}
