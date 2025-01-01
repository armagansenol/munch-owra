import s from "./pop-slider.module.scss"

import { gsap } from "@/lib/gsap"
import { useGSAP } from "@gsap/react"
import {
  Environment,
  Float,
  Html,
  MeshTransmissionMaterial,
  OrthographicCamera,
  Sphere,
  Stats,
  useGLTF,
} from "@react-three/drei"
import { Canvas, extend, useFrame, useLoader } from "@react-three/fiber"
import { BallCollider, Physics, RapierRigidBody, RigidBody } from "@react-three/rapier"
import cx from "clsx"
import { Leva, useControls } from "leva"
import { forwardRef, memo, Suspense, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"
extend({ Html })

import { IconArrow } from "@/components/icons"
import { LoadingScreen } from "@/components/loading-screen"
import { ModelOwraLogo, OwraModelTypes } from "@/components/model-owra-logo"
import { Link } from "@/components/utility/link"
import { Vortex } from "@/components/vortex"

type GLTFResult = GLTF & {
  nodes: {
    ["pCube1-mesh"]: THREE.Mesh
    ["pCube1-mesh_1"]: THREE.Mesh
    ["pCube1-mesh_2"]: THREE.Mesh
    ["pCube1-mesh_3"]: THREE.Mesh
    ["pCube1-mesh_4"]: THREE.Mesh
    ["pCube1-mesh_5"]: THREE.Mesh
    ["pCube1-mesh_6"]: THREE.Mesh
    ["pCube1-mesh_7"]: THREE.Mesh
    ["pCube1-mesh_8"]: THREE.Mesh
    ["pCube1-mesh_9"]: THREE.Mesh
    ["pCube1-mesh_10"]: THREE.Mesh
    ["pCube1-mesh_11"]: THREE.Mesh
    ["pCube1-mesh_12"]: THREE.Mesh
    ["pCube1-mesh_13"]: THREE.Mesh
    CUsersberkaOneDriveMasaüstüBardak_Altobj: THREE.Mesh
    CUsersberkaOneDriveMasaüstüBardak_Ustobj: THREE.Mesh
  }
  materials: {
    bus: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["bus #3"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #4"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #1"]: THREE.MeshPhysicalMaterial
    ["bus #2"]: THREE.MeshPhysicalMaterial
    ["Glass Basic Grey #2"]: THREE.MeshPhysicalMaterial
    Paint: THREE.MeshPhysicalMaterial
  }
}

type GLTFResultBobaCup = GLTF & {
  nodes: {
    Boba_sise2: THREE.Mesh
  }
  materials: {
    ["Cam_Kavanoz_#10"]: THREE.MeshPhysicalMaterial
  }
}

type GLTFResultBobaLid = GLTF & {
  nodes: {
    Boba_sise1: THREE.Mesh
  }
  materials: {
    ["Default:0:0:0_#11.001"]: THREE.MeshPhysicalMaterial
  }
}

type GLTFResultCoffeeCup = GLTF & {
  nodes: {
    Object_1: THREE.Mesh
  }
  materials: {
    eti1: THREE.MeshStandardMaterial
  }
}

type GLTFResultCoffeeLid = GLTF & {
  nodes: {
    CHEKA: THREE.Mesh
    KRYSH001: THREE.Mesh
  }
  materials: {
    Chrome: THREE.MeshStandardMaterial
  }
}

interface SliderItemProps {
  // active: boolean
  index: number
  // item: {
  //   position: THREE.Vector3
  //   scale: number
  //   geometry: THREE.BufferGeometry
  //   color: string
  // }
}

export default function PopSlider() {
  return (
    <div className="w-full h-full">
      <Scene />
    </div>
  )
}

function Scene() {
  return (
    <Canvas dpr={2} gl={{ antialias: true, pixelRatio: window.devicePixelRatio }}>
      <Suspense fallback={<LoadingScreen />}>
        <color attach="background" args={["#ffffff"]} />

        <Slider />

        <OrthographicCamera makeDefault zoom={50} near={0.001} far={10000} position={[0, 0, 100]} />

        <ambientLight intensity={1.25} />
        <directionalLight intensity={5.75} position={[0, 10, 0]} />
        <Environment preset="studio" environmentIntensity={0.005} environmentRotation={new THREE.Euler(0, 400, 0)} />

        {/* <OrbitControls /> */}

        <Stats showPanel={0} />
      </Suspense>
      <Html>
        <Leva />
      </Html>
    </Canvas>
  )
}

// function Slider() {
//   const groupRef = useRef<THREE.Group>(null)
//   const tlRef = useRef<gsap.core.Timeline | null>(null)
//   const [currentItem, setCurrentItem] = useState(0)
//   const { contextSafe } = useGSAP()
//   const items = ["Ice Glass", "Owra Boba"]

//   useEffect(() => {
//     if (!groupRef.current) return

//     tlRef.current = gsap
//       .timeline({ paused: true })
//       .to(
//         groupRef.current.rotation,
//         {
//           x: 0,
//           y: 0,
//           z: 0,
//           duration: 1,
//           ease: "expo.out",
//         },
//         "a"
//       )
//       .to(
//         groupRef.current.scale,
//         {
//           x: 0,
//           y: 0,
//           z: 0,
//           duration: 1,
//           ease: "expo.out",
//         },
//         "a"
//       )
//       .to(
//         groupRef.current.rotation,
//         {
//           x: 0,
//           y: 10,
//           z: 0,
//           duration: 1,
//           ease: "expo.out",
//         },
//         "s"
//       )
//       .to(
//         groupRef.current.scale,
//         {
//           x: 1,
//           y: 1,
//           z: 1,
//           duration: 1,
//           ease: "expo.out",
//         },
//         "s"
//       )

//     tlRef.current.play(1)
//   }, [])

//   useEffect(() => {
//     if (!groupRef.current) return

//     tlRef.current?.play(0)
//   }, [currentItem])

//   const handleNext = contextSafe(() => {
//     if (!tlRef.current) return
//     setCurrentItem((currentItem + 1) % items.length)
//   })

//   const handlePrev = contextSafe(() => {
//     if (!tlRef.current) return

//     setCurrentItem((currentItem - 1 + items.length) % items.length)
//   })

//   return (
//     <>
//       <group ref={groupRef}>
//         <SliderItem index={currentItem} />
//       </group>

//       <Html fullscreen pointerEvents="none" zIndexRange={[0, 100]}>
//         <div className={cx(s.controls)}>
//           <div className={cx(s.inner, "flex items-center justify-center flex-1")}>
//             <div
//               className={cx(s.button, s.prev, "flex items-center justify-center cursor-pointer")}
//               onClick={handlePrev}
//             >
//               <span>
//                 <IconArrow fill="var(--science-blue)" rotate={180} />
//               </span>
//             </div>
//             <div className={cx(s.content, "flex items-center justify-center")}>
//               <span>{items[currentItem]}</span>
//             </div>
//             <div
//               className={cx(s.button, s.next, "flex items-center justify-center cursor-pointer")}
//               onClick={handleNext}
//             >
//               <span>
//                 <IconArrow fill="var(--science-blue)" />
//               </span>
//             </div>
//           </div>
//         </div>
//         <Link className={cx(s.cta, "absolute bottom-5 right-5 flex items-center gap-2 cursor-pointer")} href="/">
//           <span>Homepage</span>
//           <span className={s.iconC}>
//             <div className="w-full h-full">
//               <IconArrow fill="var(--science-blue)" />
//             </div>
//           </span>
//         </Link>
//       </Html>

//       <PhysicsLayer />
//       <Vortex currentItem={currentItem} />
//     </>
//   )
// }

// const SliderItem = forwardRef<THREE.Mesh, SliderItemProps>(({ index }, ref) => {
//   const myRef = useRef<THREE.Mesh | null>(null)
//   useImperativeHandle(ref, () => myRef.current as THREE.Mesh)

//   const items = [
//     <>
//       <Float>
//         <IceGlass />
//       </Float>
//     </>,
//     <>
//       <Float>
//         <Boba />
//       </Float>
//     </>,
//   ]

//   return (
//     <group>
//       {items.map((item) => {
//         return item
//       })}
//     </group>
//   )
// })

function Slider() {
  const groupRef = useRef<THREE.Group>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const [currentItem, setCurrentItem] = useState(0)
  const { contextSafe } = useGSAP()
  const items = ["Ice Glass", "Owra Boba", "Coffee"]

  useEffect(() => {
    if (!groupRef.current) return

    tlRef.current = gsap
      .timeline({ paused: true })
      .to(
        groupRef.current.rotation,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "expo.out",
        },
        "a"
      )
      .to(
        groupRef.current.scale,
        {
          x: 0,
          y: 0,
          z: 0,
          duration: 1,
          ease: "expo.out",
        },
        "a"
      )
      .to(
        groupRef.current.rotation,
        {
          x: 0,
          y: 10,
          z: 0,
          duration: 1,
          ease: "expo.out",
        },
        "s"
      )
      .to(
        groupRef.current.scale,
        {
          x: 1,
          y: 1,
          z: 1,
          duration: 1,
          ease: "expo.out",
        },
        "s"
      )

    tlRef.current.play(1)
  }, [])

  useEffect(() => {
    if (!groupRef.current) return

    tlRef.current?.play(0)
  }, [currentItem])

  const handleNext = contextSafe(() => {
    if (!tlRef.current) return
    setCurrentItem((currentItem + 1) % items.length)
  })

  const handlePrev = contextSafe(() => {
    if (!tlRef.current) return
    setCurrentItem((currentItem - 1 + items.length) % items.length)
  })

  return (
    <>
      <group ref={groupRef}>
        <SliderItem currentItem={currentItem} />
      </group>

      <Html fullscreen pointerEvents="none" zIndexRange={[0, 100]}>
        <div className={cx(s.controls)}>
          <div className={cx(s.inner, "flex items-center justify-center flex-1")}>
            <div
              className={cx(s.button, s.prev, "flex items-center justify-center cursor-pointer")}
              onClick={handlePrev}
            >
              <span>
                <IconArrow fill="var(--science-blue)" rotate={180} />
              </span>
            </div>
            <div className={cx(s.content, "flex items-center justify-center")}>
              <span>{items[currentItem]}</span>
            </div>
            <div
              className={cx(s.button, s.next, "flex items-center justify-center cursor-pointer")}
              onClick={handleNext}
            >
              <span>
                <IconArrow fill="var(--science-blue)" />
              </span>
            </div>
          </div>
        </div>
        <Link className={cx(s.cta, "absolute bottom-5 right-5 flex items-center gap-2 cursor-pointer")} href="/">
          <span>Homepage</span>
          <span className={s.iconC}>
            <div className="w-full h-full">
              <IconArrow fill="var(--science-blue)" />
            </div>
          </span>
        </Link>
      </Html>

      <PhysicsLayer />
      <Vortex currentItem={currentItem} />
    </>
  )
}

const SliderItem = forwardRef<THREE.Mesh, { currentItem: number }>(({ currentItem }, ref) => {
  const myRef = useRef<THREE.Mesh | null>(null)
  useImperativeHandle(ref, () => myRef.current as THREE.Mesh)

  const items = [
    <>
      <Float>
        <IceGlass />
      </Float>
    </>,
    <>
      <Float>
        <Boba />
      </Float>
    </>,
    <>
      <Float>
        <Coffee />
      </Float>
    </>,
  ]

  return (
    <group>
      {items.map((item, index) => (
        <group key={index} scale={index === currentItem ? [1, 1, 1] : [0, 0, 0]}>
          {item}
        </group>
      ))}
    </group>
  )
})

function IceGlass() {
  const groupRef = useRef<THREE.Group | null>(null)
  const group2Ref = useRef<THREE.Group | null>(null)

  const { nodes } = useGLTF("/glb/bardak.glb") as GLTFResult
  const packageMap = useLoader(THREE.TextureLoader, "/img/chill-owra-package.png")
  const iceCubesMap = useLoader(THREE.TextureLoader, "/img/ice-cubes-fill.png")

  useMemo(() => {
    if (packageMap) {
      packageMap.wrapS = packageMap.wrapT = THREE.ClampToEdgeWrapping
      packageMap.offset.set(-1.2, -0.2)
      packageMap.rotation = Math.PI * 1.5
      packageMap.flipY = true
      packageMap.center = new THREE.Vector2(0.5, 0.5)

      // const aspectRatio = packageMap.image.width / packageMap.image.height
      packageMap.repeat.set(1.2, 1.5)
    }
  }, [packageMap])

  const cupMaterialProps = useControls(
    "ice glass material",
    {
      transmissionSampler: false,
      backside: true,
      backsideThickness: { value: 0, min: -10, max: 10 },
      samples: { value: 3, min: 0, max: 32, step: 1 },
      resolution: { value: 1024, min: 256, max: 2048, step: 256 },
      backsideResolution: { value: 2048, min: 32, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.39, min: 0, max: 1, step: 0.01 },
      ior: { value: 1.5, min: 1, max: 5, step: 0.01 },
      thickness: { value: 0.05, min: 0, max: 10, step: 0.01 },
      chromaticAberration: { value: 0, min: 0, max: 1 },
      anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
      attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationColor: "#ffffff",
      color: "white",
    },
    { collapsed: true }
  )

  const { contextSafe } = useGSAP()

  const [rotateSpeed, setRotateSpeed] = useState(0.2)

  const handlePointerOver = contextSafe(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    gsap.to(groupRef.current.scale, {
      x: 0.04,
      y: 0.04,
      z: 0.04,
      duration: 0.4,
      ease: "back.out",
    })

    setRotateSpeed(3)
  })

  const handlePointerOut = contextSafe(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    gsap.to(groupRef.current.scale, {
      x: 0.035,
      y: 0.035,
      z: 0.035,
      duration: 0.4,
      ease: "back.out",
    })

    setRotateSpeed(0.2)
  })

  useFrame(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    // groupRef.current.rotation.x += 0.0002
    // groupRef.current.rotation.y += 0.0002
    // groupRef.current.rotation.z += 0.0002

    group2Ref.current.rotation.y -= 0.02 * rotateSpeed
  })

  return (
    <group position={[0, -0.5, 0]} scale={0.035} ref={groupRef}>
      <group
        ref={group2Ref}
        position={[0, -4.5, 0]}
        onPointerEnter={handlePointerOver}
        onPointerLeave={handlePointerOut}
      >
        <mesh
          geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Ustobj.geometry}
          position={[1.37532806, -173.60058784, 0.00108719]}
        >
          <MeshTransmissionMaterial {...cupMaterialProps} side={THREE.DoubleSide} toneMapped={false} />
        </mesh>

        <mesh geometry={nodes.CUsersberkaOneDriveMasaüstüBardak_Altobj.geometry} position={[1.3753624, -169.21138, 0]}>
          <MeshTransmissionMaterial {...cupMaterialProps} side={THREE.DoubleSide} map={packageMap} toneMapped={false} />
        </mesh>
      </group>

      <group scale={60} position={[0, 5, 5]} rotation={[0, 0, Math.PI / 18]}>
        <mesh geometry={new THREE.PlaneGeometry(6, 4)}>
          <meshPhysicalMaterial
            map={iceCubesMap}
            bumpMap={iceCubesMap}
            bumpScale={4}
            color={"#ffffff"}
            transparent={true}
            opacity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}

function Boba() {
  const groupRef = useRef<THREE.Group | null>(null)
  const group2Ref = useRef<THREE.Group | null>(null)

  const packageMap = useLoader(THREE.TextureLoader, "/img/boba-pineapple.jpg")
  const fillMap = useLoader(THREE.TextureLoader, "/img/boba-fill.png")
  const { nodes: bobaCupNodes } = useGLTF("/glb/boba-cup.glb") as GLTFResultBobaCup
  const { nodes: BobaLidNodes } = useGLTF("/glb/boba-lid.glb") as GLTFResultBobaLid

  useMemo(() => {
    if (packageMap) {
      packageMap.wrapS = packageMap.wrapT = THREE.ClampToEdgeWrapping
      packageMap.offset.set(0, 0)
      packageMap.rotation = Math.PI * 2
      packageMap.flipY = false
      packageMap.center = new THREE.Vector2(0.5, 0.5)

      const aspectRatio = packageMap.image.width / packageMap.image.height
      packageMap.repeat.set(1, -1)
    }
  }, [packageMap])

  const materialProps = useControls(
    "boba material",
    {
      meshPhysicalMaterial: false,
      transmissionSampler: false,
      backside: false,
      backsideThickness: { value: 2, min: -10, max: 10 },
      samples: { value: 3, min: 0, max: 32, step: 1 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      backsideResolution: { value: 2048, min: 32, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      ior: { value: 3.5, min: 1, max: 5, step: 0.01 },
      thickness: { value: 0.05, min: 0, max: 10, step: 0.01 },
      chromaticAberration: { value: 0.4, min: 0, max: 1 },
      anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.65, min: 0, max: 1, step: 0.01 },
      attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationColor: "#ffffff",
      color: "white",
    },
    { collapsed: true }
  )

  const { contextSafe } = useGSAP()

  const [rotateSpeed, setRotateSpeed] = useState(0.2)

  const handlePointerOver = contextSafe(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    gsap.to(groupRef.current.scale, {
      x: 0.75,
      y: 0.75,
      z: 0.75,
      duration: 0.3,
      ease: "back.out",
    })

    setRotateSpeed(2)
  })

  const handlePointerOut = contextSafe(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    gsap.to(groupRef.current.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 0.3,
      ease: "back.out",
    })

    setRotateSpeed(0.2)
  })

  useFrame(() => {
    if (!groupRef.current) return
    if (!group2Ref.current) return

    // groupRef.current.rotation.x += 0.0002
    // groupRef.current.rotation.y += 0.0002
    // groupRef.current.rotation.z += 0.0002

    group2Ref.current.rotation.y -= 0.02 * rotateSpeed
  })

  return (
    <>
      <group position={[0, -1, 0]} scale={0.6} ref={groupRef}>
        <group
          ref={group2Ref}
          position={[0, -4.5, 0]}
          onPointerEnter={handlePointerOver}
          onPointerLeave={handlePointerOut}
        >
          <mesh geometry={BobaLidNodes.Boba_sise1.geometry} position={[0, 11.927, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <meshPhongMaterial color={new THREE.Color("#000000")} side={THREE.DoubleSide} />
          </mesh>

          <mesh geometry={bobaCupNodes.Boba_sise2.geometry} position={[0, 5.795, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <MeshTransmissionMaterial {...materialProps} />
          </mesh>

          <mesh geometry={new THREE.CylinderGeometry(4.05, 4.05, 8.25, 64, 1, true)} position={[0, 5.8, 0]}>
            <meshStandardMaterial map={packageMap} toneMapped={false} side={THREE.DoubleSide} />
          </mesh>
        </group>

        <group scale={1.5} position={[0, 0.75, 0]} rotation={[Math.PI / 1, 0, 0]}>
          <mesh geometry={new THREE.PlaneGeometry(5, 7)}>
            <meshPhysicalMaterial
              map={fillMap}
              bumpMap={fillMap}
              bumpScale={4}
              color={"#FFFFFF"}
              transparent={true}
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      </group>
    </>
  )
}

function Coffee() {
  const groupRef = useRef<THREE.Group | null>(null)
  const packageMap = useLoader(THREE.TextureLoader, "/img/coffee-package-noir.png")
  const coffeeMap = useLoader(THREE.TextureLoader, "/img/foam-texture.jpg")
  const { nodes: cupNodes } = useGLTF("/glb/coffee-cup.glb") as GLTFResultCoffeeCup
  const { nodes: lidNodes } = useGLTF("/glb/coffee-lid.glb") as GLTFResultCoffeeLid

  useMemo(() => {
    if (packageMap) {
      packageMap.wrapS = packageMap.wrapT = THREE.ClampToEdgeWrapping
      packageMap.offset.set(0, 0.2)
      packageMap.rotation = Math.PI * 2.5
      packageMap.flipY = true
      packageMap.center = new THREE.Vector2(0.5, 0.5)
      packageMap.magFilter = THREE.NearestFilter
      packageMap.generateMipmaps = false

      const aspectRatio = packageMap.image.width / packageMap.image.height
      packageMap.repeat.set(1, -2.2)
    }
  }, [packageMap])

  useMemo(() => {
    if (coffeeMap) {
      coffeeMap.wrapS = coffeeMap.wrapT = THREE.ClampToEdgeWrapping
      coffeeMap.offset.set(0, 0.15)
      coffeeMap.rotation = Math.PI * 2.5
      coffeeMap.flipY = true
      coffeeMap.center = new THREE.Vector2(0.5, 0.5)

      const aspectRatio = coffeeMap.image.width / coffeeMap.image.height
      coffeeMap.repeat.set(1.5, 1.5)
    }
  }, [coffeeMap])

  const materialProps = useControls(
    "coffe cup material",
    {
      transmissionSampler: false,
      backside: false,
      backsideThickness: { value: 2, min: -10, max: 10 },
      samples: { value: 3, min: 0, max: 32, step: 1 },
      resolution: { value: 1024, min: 256, max: 2048, step: 256 },
      backsideResolution: { value: 1024, min: 32, max: 2048, step: 256 },
      transmission: { value: 1, min: 0, max: 1 },
      roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
      ior: { value: 3.5, min: 1, max: 5, step: 0.01 },
      thickness: { value: 0.05, min: 0, max: 10, step: 0.01 },
      chromaticAberration: { value: 0.4, min: 0, max: 1 },
      anisotropy: { value: 0.3, min: 0, max: 1, step: 0.01 },
      distortion: { value: 0.0, min: 0, max: 1, step: 0.01 },
      distortionScale: { value: 0.3, min: 0.01, max: 1, step: 0.01 },
      temporalDistortion: { value: 0.65, min: 0, max: 1, step: 0.01 },
      attenuationDistance: { value: 0.5, min: 0, max: 2.5, step: 0.01 },
      clearcoat: { value: 0, min: 0, max: 1 },
      attenuationColor: "#ffffff",
      color: "white",
    },
    { collapsed: true }
  )

  const metallicMaterialProps = useControls(
    "coffee lid material",
    {
      backside: false,
      backsideThickness: { value: 2, min: -10, max: 10 },
      resolution: { value: 2048, min: 256, max: 2048, step: 256 },
      backsideResolution: { value: 2048, min: 32, max: 2048, step: 256 },
      roughness: { value: 0.1, min: 0, max: 1, step: 0.01 }, // Slightly rougher for brushed metal
      metalness: { value: 1, min: 0, max: 1 }, // Fully metallic
      ior: { value: 1.45, min: 1, max: 5, step: 0.01 }, // Lower IOR for a less intense reflection
      thickness: { value: 0.05, min: 0, max: 10, step: 0.01 },
      anisotropy: { value: 0.6, min: 0, max: 1, step: 0.01 }, // Higher anisotropy for brushed metal effect
      clearcoat: { value: 0.7, min: 0, max: 1 }, // For a glossy finish
      attenuationColor: "#ffffff",
      color: "#ffffff", // Silver color
    },
    { collapsed: true }
  )

  useFrame(() => {
    if (!groupRef.current) return

    // groupRef.current.rotation.x += 0.01
    groupRef.current.rotation.y -= 0.01
    // groupRef.current.rotation.z += 0.01
  })

  return (
    <>
      <group position={[0, 0, 0]} rotation={[0, 1, 0]}>
        <group ref={groupRef} scale={0.6} position={[0, 0, 0]}>
          <group>
            <mesh geometry={lidNodes.CHEKA.geometry} position={[0, 7.5, 0]}>
              <meshPhysicalMaterial toneMapped={false} side={THREE.DoubleSide} {...metallicMaterialProps} />
            </mesh>
            <mesh geometry={lidNodes.KRYSH001.geometry} position={[0, 7.5, 0]}>
              <meshPhysicalMaterial toneMapped={false} side={THREE.DoubleSide} {...metallicMaterialProps} />
            </mesh>
          </group>

          <group>
            <mesh geometry={cupNodes.Object_1.geometry} position={[0, 0, 0]}>
              <meshStandardMaterial map={packageMap} toneMapped={false} side={THREE.DoubleSide} transparent={true} />
            </mesh>
          </group>

          <group scale={0.95}>
            <mesh geometry={cupNodes.Object_1.geometry} position={[0, 0, 0]} receiveShadow={false} castShadow={false}>
              <meshStandardMaterial
                map={coffeeMap}
                color={new THREE.Color("#CCAE88")}
                toneMapped={false}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>

          <group scale={0.98}>
            <mesh geometry={cupNodes.Object_1.geometry} position={[0, 0, 0]}>
              <MeshTransmissionMaterial {...materialProps} />
            </mesh>
          </group>
        </group>
      </group>
    </>
  )
}

interface PhysicsLayerProps {
  currentItem?: number
}

const PhysicsLayer = memo((props: PhysicsLayerProps) => {
  return (
    <Physics gravity={[0, 0, 0]} debug>
      <ModelOwraLogo modelType={OwraModelTypes.w} scale={1.3} position={new THREE.Vector3(-10, -4, 0)} />
      <ModelOwraLogo modelType={OwraModelTypes.o} scale={0.8} position={new THREE.Vector3(-10, 5, 0)} />
      <ModelOwraLogo modelType={OwraModelTypes.r} scale={0.7} position={new THREE.Vector3(9, 4, 0)} />
      <ModelOwraLogo modelType={OwraModelTypes.a} scale={1.2} position={new THREE.Vector3(11, -4, 0)} />
      <Pointer />
    </Physics>
  )
})

PhysicsLayer.displayName = "PhysicsLayer"

function Pointer({ vec = new THREE.Vector3() }) {
  const api = useRef<RapierRigidBody>(null)

  useFrame(({ pointer, viewport }) => {
    api.current?.setNextKinematicTranslation(
      vec.set((pointer.x * viewport.width) / 2, (pointer.y * viewport.height) / 2, 0)
    )
  })

  return (
    <RigidBody position={[0, 0, 0]} type="kinematicPosition" colliders={false} ref={api}>
      <BallCollider args={[0.5]}>
        <Sphere args={[0.5]}>
          <meshBasicMaterial color="#FF5B4A" transparent={true} opacity={0.1} />
        </Sphere>
      </BallCollider>
    </RigidBody>
  )
}

SliderItem.displayName = "SliderItem"

useGLTF.preload("/glb/coffee-lid.glb")
useGLTF.preload("/glb/coffee-cup.glb")
useGLTF.preload("/glb/boba-lid.glb")
useGLTF.preload("/glb/boba-cup.glb")
useGLTF.preload("/glb/bardak.glb")
