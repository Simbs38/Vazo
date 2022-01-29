import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'

export class RenderHead {
  public scene : THREE.Scene;
  public renderer : THREE.WebGLRenderer;
  public controls : OrbitControls;

  public constructor (camera : THREE.Camera) {
    this.scene = new THREE.Scene()
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.controls = new OrbitControls(camera, this.renderer.domElement)
    this.controls.enablePan = false
  }

  public AddMeshToScene (mesh : THREE.Mesh): void {
    this.scene.add(mesh)
  }

  public CreateCube (): THREE.Mesh {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: false
    })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

    return cube
  }

  getDomElement (): HTMLCanvasElement {
    return this.renderer.domElement
  }
}
