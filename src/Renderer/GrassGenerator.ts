import * as THREE from 'three'
import { grassMaterial } from './Materials/GrassMaterial'

export class GrassGenerator {
    public mesh : THREE.Mesh
    private time : number
    private lastFrame : number
    private thisFrame : number
    private deltaTime : number
    private material : THREE.ShaderMaterial
    private bladeWidth : number
    private bladeHeight : number
    private joints : number
    private instances : number
    private width : number

    public constructor (bladeWidth : number, bladeHeigth : number, instances : number, width : number, joints : number) {
        this.material = grassMaterial
        this.bladeWidth = bladeWidth
        this.bladeHeight = bladeHeigth
        this.instances = instances
        this.joints = joints
        this.width = width
        this.mesh = this.GenerateMesh()
        this.time = 0
        this.lastFrame = Date.now()
        this.thisFrame = 0
        this.deltaTime = 0
    }

    public UpdateMaterial () : void {
        this.thisFrame = Date.now()
        this.deltaTime = (this.thisFrame - this.lastFrame) / 200.0
        this.time += this.deltaTime
        this.lastFrame = this.thisFrame

        this.material.uniforms.time.value = this.time
    }

    private GenerateMesh () : THREE.Mesh {
        // Define base geometry that will be instanced. We use a plane for an individual blade of grass
        const grassBaseGeometry = new THREE.PlaneBufferGeometry(this.bladeWidth, this.bladeHeight, 1, this.joints)
        grassBaseGeometry.translate(0, this.bladeHeight / 2, 0)

        // Define the bend of the grass blade as the combination of three quaternion rotations
        const vertex = new THREE.Vector3()
        const quaternion0 = new THREE.Quaternion()
        const quaternion1 = new THREE.Quaternion()

        // Rotate around Y
        let angle = 0.05
        let sinAngle = Math.sin(angle / 2.0)
        const rotationAxis = new THREE.Vector3(0, 1, 0)
        let x = rotationAxis.x * sinAngle
        let y = rotationAxis.y * sinAngle
        let z = rotationAxis.z * sinAngle
        let w = Math.cos(angle / 2.0)
        quaternion0.set(x, y, z, w)

        // Rotate around X
        angle = 0.3
        sinAngle = Math.sin(angle / 2.0)
        rotationAxis.set(1, 0, 0)
        x = rotationAxis.x * sinAngle
        y = rotationAxis.y * sinAngle
        z = rotationAxis.z * sinAngle
        w = Math.cos(angle / 2.0)
        quaternion1.set(x, y, z, w)

        // Combine rotations to a single quaternion
        quaternion0.multiply(quaternion1)

        // Rotate around Z
        angle = 0.1
        sinAngle = Math.sin(angle / 2.0)
        rotationAxis.set(0, 0, 1)
        x = rotationAxis.x * sinAngle
        y = rotationAxis.y * sinAngle
        z = rotationAxis.z * sinAngle
        w = Math.cos(angle / 2.0)
        quaternion1.set(x, y, z, w)

        // Combine rotations to a single quaternion
        quaternion0.multiply(quaternion1)

        const quaternion2 = new THREE.Quaternion()

        // Bend grass base geometry for more organic look
        for (let v = 0; v < grassBaseGeometry.attributes.position.array.length; v += 3) {
            quaternion2.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2)
            vertex.x = grassBaseGeometry.attributes.position.array[v]
            vertex.y = grassBaseGeometry.attributes.position.array[v + 1]
            vertex.z = grassBaseGeometry.attributes.position.array[v + 2]
            const frac = vertex.y / this.bladeHeight
            quaternion2.slerp(quaternion0, frac)
            vertex.applyQuaternion(quaternion2)
            grassBaseGeometry.attributes.position.setXYZ(v, vertex.x, vertex.y, vertex.z)
        }

        grassBaseGeometry.computeVertexNormals()

        const instancedGeometry = new THREE.InstancedBufferGeometry()

        instancedGeometry.index = grassBaseGeometry.index
        instancedGeometry.attributes.position = grassBaseGeometry.attributes.position
        instancedGeometry.attributes.uv = grassBaseGeometry.attributes.uv
        instancedGeometry.attributes.normal = grassBaseGeometry.attributes.normal

        // Each instance has its own data for position, orientation and scale
        const indices = []
        const offsets = []
        const scales = []
        const halfRootAngles = []

        // For each instance of the grass blade
        for (let i = 0; i < this.instances; i++) {
            indices.push(i / this.instances)

            // Offset of the roots
            x = Math.random() * this.width - this.width / 2
            z = Math.random() * this.width - this.width / 2
            y = 0
            offsets.push(x, y, z)

            // Random orientation
            const angle = Math.PI - Math.random() * (2 * Math.PI)
            halfRootAngles.push(Math.sin(0.5 * angle), Math.cos(0.5 * angle))

            // Define variety in height
            if (i % 3 !== 0) {
                scales.push(2.0 + Math.random() * 1.25)
            } else {
                scales.push(2.0 + Math.random())
            }
        }

        const offsetAttribute = new THREE.InstancedBufferAttribute(new Float32Array(offsets), 3)
        const scaleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(scales), 1)
        const halfRootAngleAttribute = new THREE.InstancedBufferAttribute(new Float32Array(halfRootAngles), 2)
        const indexAttribute = new THREE.InstancedBufferAttribute(new Float32Array(indices), 1)

        instancedGeometry.setAttribute('offset', offsetAttribute)
        instancedGeometry.setAttribute('scale', scaleAttribute)
        instancedGeometry.setAttribute('halfRootAngle', halfRootAngleAttribute)
        instancedGeometry.setAttribute('index', indexAttribute)

        return new THREE.Mesh(instancedGeometry, grassMaterial)
    }
}
