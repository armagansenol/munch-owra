import { gsap } from "@/lib/gsap"
import { useGLTF } from "@react-three/drei"
import { useLoader } from "@react-three/fiber"
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import { useControls } from "leva"
import * as React from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
import { ModelOwraLogo } from "../model-owra-logo"

type GLTFResult = GLTF & {
  nodes: {
    pCube1: THREE.Mesh
  }
  materials: {
    ["Glass Wavy White #1"]: THREE.MeshPhysicalMaterial
  }
}

interface Props {
  scale: number
  position: THREE.Vector3
}

export default function IceCube(props: Props) {
  const api = React.useRef<RapierRigidBody | null>(null)
  const { nodes } = useGLTF("/glb/ice-origin-center.glb") as GLTFResult
  const meshRef = React.useRef<any>(null)

  const tex = useLoader(THREE.TextureLoader, "/img/ice-texture.jpg")

  React.useMemo(() => {
    const vec2 = new THREE.Vector2(5, 10)
    tex.wrapS = THREE.RepeatWrapping
    tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(vec2.x, vec2.y)
  }, [tex])

  const materialProps = useControls(
    "ice cube",
    {
      transmissionSampler: false,
      backside: true,
      backsideThickness: { value: 2, min: -10, max: 10 },
      samples: { value: 3, min: 0, max: 32, step: 1 },
      resolution: { value: 1024, min: 256, max: 2048, step: 256 },
      backsideResolution: { value: 1024, min: 32, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.39, min: 0, max: 1, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      thickness: { value: 0.05, min: 0, max: 10, step: 0.01 },
      chromaticAberration: { value: 0.4, min: 0, max: 1 },
      anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
      attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationColor: "#e2f8f6",
      color: "#e2f8f6",
    },
    { collapsed: true }
  )

  const rt = new THREE.Euler(
    gsap.utils.random(-10, 10, 0.1),
    gsap.utils.random(-10, 10, 0.1),
    gsap.utils.random(-10, 10, 0.1)
  )

  const vec4 = new THREE.Vector4()

  // useFrame((state) => {
  //   if (!api.current) return
  //   const time = state.clock.getElapsedTime() / 1000

  //   // api.current.addTorque(vec.set(time, 0, 0), true)

  //   api.current.setRotation(vec4.set(time * Math.PI, time * Math.PI, time * Math.PI, time * Math.PI), true)
  // })

  React.useEffect(() => {
    const vec3 = new THREE.Vector3()

    if (!api.current) return

    api.current.addTorque(vec3.set(1, 0, 0), true)
  }, [])

  return (
    <>
      <RigidBody
        ref={api}
        colliders={false}
        enabledRotations={[true, true, true]}
        enabledTranslations={[false, false, false]}
        linearDamping={10} // Increase this to slow down linear movement
        angularDamping={10} // More angular resistance to simulate drag
        mass={50000}
        canSleep={false}
        restitution={0.1} // Lower restitution for softer impacts in water
        friction={0.1} // Lower friction for smoother movement
        rotation={rt}
        position={props.position}
        scale={props.scale}
      >
        <CuboidCollider args={[1, 1, 1]} scale={props.scale}>
          {/* <mesh ref={meshRef} geometry={nodes.pCube1.geometry}>
            <meshPhysicalMaterial {...materialProps} normalMap={tex} />
          </mesh> */}
          {/* <ModelO /> */}
        </CuboidCollider>
      </RigidBody>
    </>
  )
}
