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

  public AddLigth (x : number, y : number, z : number, color : THREE.ColorRepresentation): THREE.Light {
    // const tmp = new THREE.PointLight(color)
    // this.scene.add(tmp)
    // tmp.position.set(x, y, z)

    // const tmp2 = new THREE.PointLightHelper(tmp, 1, new THREE.Color(color))
    // this.scene.add(tmp2)
    const hemiLigth = new THREE.HemisphereLight(0xe6f7ec, 0x111024, 2)
    this.scene.add(hemiLigth)

    const spotLigth = new THREE.SpotLight(0xffa95c, 4)
    spotLigth.castShadow = true
    spotLigth.shadow.bias = -0.00001
    spotLigth.shadow.mapSize.height = 1024 * 4
    spotLigth.shadow.mapSize.width = 1024 * 4
    this.scene.add(spotLigth)

    return spotLigth
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
