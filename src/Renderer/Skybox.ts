import * as THREE from 'three'

export class Skybox {
    public static Create (textureMaterial : THREE.Material) : THREE.Mesh {
        const skyboxGeometry = new THREE.BoxGeometry(1000, 1000, 1000, 1, 1, 1)
        const positions = skyboxGeometry.attributes.position.array
        const positionsCount = positions.length / 3
        const tmp = new Float32Array(positionsCount * 2)

        for (let i = 0; i !== positions.length; i++) {
            if (positions[(i * 3) + 1] < 0) {
                tmp[i * 2] = 0
                tmp[(i * 2) + 1] = 0
            } else {
                tmp[i * 2] = 1
                tmp[(i * 2) + 1] = 1
            }
        }

        skyboxGeometry.setAttribute('uv', new THREE.BufferAttribute(tmp, 2))
        return new THREE.Mesh(skyboxGeometry, textureMaterial)
    }
}
