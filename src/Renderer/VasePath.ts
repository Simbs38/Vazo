import * as THREE from 'three'
import { Quaternion, Vector3 } from 'three'

export class VasePath {
    private runningClockwise : boolean
    private pathPoints : Array<Vector3>
    private startTime : number
    private lapRound : number
    private pathLength : number
    private distanceMap : Array<number>

    public constructor (orbitCenter : THREE.Vector3, orbitMinSize: THREE.Vector2, orbitMaxSize : THREE.Vector2, clockWise : boolean) {
        const path = new THREE.Path()
        this.runningClockwise = clockWise
        const orbitSizeX = (Math.random() * (orbitMaxSize.x - orbitMinSize.x)) + orbitMinSize.x
        const orbitSizeY = (Math.random() * (orbitMaxSize.y - orbitMinSize.y)) + orbitMinSize.y
        const rotation = Math.random() * Math.PI
        this.startTime = Date.now()
        this.lapRound = (Math.random() * 1000000 - 100000) + 100000

        path.absellipse(orbitCenter.x, orbitCenter.y, orbitSizeX, orbitSizeY, 0, Math.PI * 2, this.runningClockwise, rotation)
        this.pathLength = path.getLength()
        const rawPoints = path.getPoints(this.pathLength)
        this.pathPoints = new Array(rawPoints.length)
        this.distanceMap = new Array<number>(rawPoints.length)

        const randomQuaternion = this.GetRandomQuaternion()
        let lastPoint = new THREE.Vector3()
        let currentDistance = 0

        for (let i = 0; i !== rawPoints.length; i++) {
            let tmp = new THREE.Vector3(rawPoints[i].x, rawPoints[i].y, orbitCenter.z)
            tmp = tmp.applyQuaternion(randomQuaternion)
            if (i === 0) {
                lastPoint = tmp
            }

            currentDistance += lastPoint.distanceTo(tmp)
            this.distanceMap[i] = currentDistance
            this.pathPoints[i] = tmp
            lastPoint = tmp
        }
    }

    public GetCurvePoints (material : THREE.Material) : THREE.Line {
        const geometry = new THREE.BufferGeometry().setFromPoints(this.pathPoints)
        return new THREE.Line(geometry, material)
    }

    public GetCurrentPosition () : THREE.Vector3 {
        return this.LerpList(this.GetTimeFactor())
    }

    public GetFirstPoint () : THREE.Vector3 {
        return this.pathPoints[0]
    }

    // http://planning.cs.uiuc.edu/node198.html
    private GetRandomQuaternion () : THREE.Quaternion {
        const u = Math.random()
        const v = Math.random()
        const w = Math.random()

        const quatX = Math.sqrt(1 - u) * Math.sin(2 * Math.PI * v)
        const quatY = Math.sqrt(1 - u) * Math.cos(2 * Math.PI * v)
        const quatZ = Math.sqrt(u) * Math.sin(2 * Math.PI * w)
        const quatW = Math.sqrt(u) * Math.cos(2 * Math.PI * w)

        return new Quaternion(quatX, quatY, quatZ, quatW)
    }

    private GetTimeFactor () : number {
        const currentTime = Date.now()
        const time = ((currentTime - this.startTime) / this.lapRound) % 1
        return time
    }

    private LerpList (timeFactor : number) : THREE.Vector3 {
        let pointDistance = timeFactor * this.pathLength

        for (let i = 0; i !== this.pathPoints.length; i++) {
            if ((i + 1) === this.pathPoints.length) {
                return this.pathPoints[i]
            } else if (pointDistance < this.distanceMap[i]) {
                pointDistance -= this.distanceMap[i]
                const factor = pointDistance / this.distanceMap[i] - this.distanceMap[i - 1]
                const ans = new Vector3().lerpVectors(this.pathPoints[i - 1], this.pathPoints[i], factor)

                return ans
            }
        }

        return this.pathPoints[this.pathPoints.length - 1]
    }
}
