import * as THREE from 'three'

export class RenderHead {
  public scene : THREE.Scene;
  public renderer : THREE.WebGLRenderer;
  public camera : THREE.PerspectiveCamera;
  private static instance : RenderHead;

  public static getInstance (): RenderHead {
    if (RenderHead.instance == null) {
      RenderHead.instance = new RenderHead()
    }

    return RenderHead.instance
  }

  constructor () {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x456990)

    const light = new THREE.PointLight()
    light.position.set(20, 20, 250)
    this.scene.add(light)

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      10,
      800
    )
    this.camera.position.set(0, 0, 5)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', this.onWindowResize, false)
  }

  CreateCube (): THREE.Mesh {
    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshToonMaterial({
      color: 0x00ff00,
      wireframe: true
    })
    const cube = new THREE.Mesh(geometry, material)
    this.scene.add(cube)

    return cube
  }

  getDomElement (): HTMLCanvasElement {
    return this.renderer.domElement
  }

  startRendering (): void{
    RenderHead.render()
  }

  private static render (): void{
    const head = RenderHead.getInstance()
    head.renderer.render(head.scene, head.camera)
    requestAnimationFrame(RenderHead.render)
  }

  private onWindowResize (): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    RenderHead.render()
  }
}
