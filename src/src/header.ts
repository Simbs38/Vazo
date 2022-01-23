import { RenderHead } from './RenderHead'
import * as THREE from 'three'

export function startHeader ():void {
  const tmpElement = document.getElementById('headCanvas') as HTMLElement

  if (tmpElement != null) {
    const renderer = RenderHead.getInstance()
    renderer.startRendering()
    const cube = renderer.CreateCube() as THREE.Mesh
    tmpElement.appendChild(renderer.getDomElement())
    renderer.camera.lookAt(cube.position)
  }
}
