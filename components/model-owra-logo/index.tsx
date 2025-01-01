import { gsap } from "@/lib/gsap"
import { useGLTF } from "@react-three/drei"
import { CuboidCollider, RapierRigidBody, RigidBody } from "@react-three/rapier"
import React, { ReactNode, useEffect, useRef } from "react"
import * as THREE from "three"
import { GLTF } from "three-stdlib"

type GLTFResult = GLTF & {
  nodes: {
    w: THREE.Mesh
    a: THREE.Mesh
    o: THREE.Mesh
    r: THREE.Mesh
  }
  materials: {
    ["SVGMat.001"]: THREE.MeshStandardMaterial
    ["SVGMat.007"]: THREE.MeshStandardMaterial
    ["SVGMat.004"]: THREE.MeshStandardMaterial
    ["SVGMat.006"]: THREE.MeshStandardMaterial
  }
}

export enum OwraModelTypes {
  o = "o",
  w = "w",
  r = "r",
  a = "a",
}

interface ModelProps {
  modelType: OwraModelTypes
  position: any
  scale: any
  moved?: boolean
}

export function ModelOwraLogo(props: ModelProps) {
  const { nodes } = useGLTF("/glb/owra.glb") as GLTFResult
  const { modelType } = props

  return (
    <PhysicsWrapper position={props.position} scale={props.scale} moved={props.moved}>
      <group dispose={null} scale={40}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes[modelType].geometry}
          material={new THREE.MeshStandardMaterial({ color: "#FF5B4A" })}
        />
      </group>
    </PhysicsWrapper>
  )
}

interface PhysicsWrapperProps {
  children: ReactNode
  position: any
  scale: any
  moved?: boolean
}

export default function PhysicsWrapper(props: PhysicsWrapperProps) {
  const api = useRef<RapierRigidBody>(null)
  const originalPosition = useRef(new THREE.Vector3(...props.position)) // Store original position as a Vector3
  const threshold = 0.1 // Max distance allowed from original position before pulling back

  useEffect(() => {
    if (api.current) {
      // Ensure we set the exact original position using Rapier's API
      api.current.setTranslation(originalPosition.current, true)
    }
  }, [])

  // Function to return the object to its original position if it exceeds the threshold
  const returnToOriginalPosition = () => {
    if (!api.current) return

    const translation = api.current.translation() // Get the current translation
    const currentPos = new THREE.Vector3(translation.x, translation.y, translation.z)
    const distanceFromOriginal = currentPos.distanceTo(originalPosition.current)

    // If the object has moved too far from its original position
    if (distanceFromOriginal > threshold) {
      gsap.to(currentPos, {
        x: originalPosition.current.x,
        y: originalPosition.current.y,
        z: originalPosition.current.z,
        duration: 2,
        ease: "back.out",
        onUpdate: () => {
          // Explicitly set the translation using Rapier API to ensure it snaps back
          api.current?.setTranslation(currentPos, true)
        },
        onComplete: () => {
          // Ensure the final position is set exactly to the original after animation
          api.current?.setTranslation(originalPosition.current, true)
          api.current?.enableCcd(true)
        },
      })
    }
  }

  // Handle mouse pointer interaction (assuming you have a pointer collision detection)
  const handlePointerEnter = () => {
    api.current?.enableCcd(false)
    // Check after 0.5 seconds if it needs to return to its original position
    gsap.delayedCall(0.5, () => {
      returnToOriginalPosition()
    })
  }
  console.log("RENDER")

  return (
    <RigidBody
      ref={api}
      enabledRotations={[true, true, true]}
      enabledTranslations={[true, true, false]}
      angularDamping={5}
      linearDamping={2}
      friction={0.1}
      restitution={0.8}
      position={props.position}
      scale={props.scale}
      canSleep={false}
      colliders="cuboid"
      ccd={false}
      onCollisionExit={handlePointerEnter} // Trigger interaction
      rotation={new THREE.Euler(gsap.utils.random(-10, 10), gsap.utils.random(-10, 10), gsap.utils.random(-10, 10))}
    >
      {props.children}
    </RigidBody>
  )
}

useGLTF.preload("/glb/owra.glb")
