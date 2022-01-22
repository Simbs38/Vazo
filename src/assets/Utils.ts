import * as THREE from 'three'

export function doStuff (object: THREE.Group) :THREE.Group {
  const ans = new THREE.Group()
  const particlesGeometry = new THREE.BufferGeometry()
  const particlesCnt = 30
  const posArray = new Float32Array(particlesCnt * 3)

  for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 600
    if (Math.abs(posArray[i]) < 30) {
      posArray[i] = Math.sign(posArray[i]) * 50
    }
  }
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
  for (let i = 0; i < posArray.length; i += 3) {
    const newGeometry = new THREE.Group()
    newGeometry.copy(object, true)
    newGeometry.position.set(posArray[i], posArray[i + 1], posArray[i + 2])
    const scaleFactor = Math.random()
    const rotation = getRandomVector3()
    newGeometry.rotation.set(rotation.x, rotation.y, rotation.z)
    newGeometry.scale.set(scaleFactor, scaleFactor, scaleFactor)
    ans.add(newGeometry)
  }
  return ans
}

export function AnimateBackGround (otherObject : THREE.Object3D, mouseX : number, mouseY : number): void {
  otherObject.rotation.y += mouseX * 0.001
  otherObject.rotation.x += mouseY * 0.001
}

function getRandomVector3 () {
  const x = Math.random() - 0.5
  const y = Math.random() - 0.5
  const z = Math.random() - 0.5
  return new THREE.Vector3(x, y, z)
}
