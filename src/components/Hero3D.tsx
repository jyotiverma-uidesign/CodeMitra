/// <reference types="@react-three/fiber" />
import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '../components/ui/button'
import * as THREE from 'three'

// Extend JSX for Three.js elements
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any
      torusGeometry: any
      meshStandardMaterial: any
      ambientLight: any
      directionalLight: any
    }
  }
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// 3D Scene Component
function Scene() {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const { camera } = useThree()
  const [isMobile, setIsMobile] = useState(false)

  // Check for mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Floating and rotation animation
  useFrame((state) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.y += 0.005 * (isMobile ? 0.5 : 1)
    meshRef.current.position.y = Math.sin(time * 0.5) * 0.1
  })

  // GSAP ScrollTrigger animations
  useEffect(() => {
    if (!meshRef.current) return

    const tl = gsap.timeline()

    // Intro animation
    tl.from(meshRef.current.scale, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: 'power3.out'
    }).from(
      meshRef.current.rotation,
      {
        y: Math.PI * 2,
        duration: 1.5,
        ease: 'power3.out'
      },
      0
    )

    // Scroll-based animations
    const trigger = ScrollTrigger.create({
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        if (!meshRef.current) return

        const progress = self.progress
        meshRef.current.rotation.y = progress * Math.PI * 2
        camera.position.z = 5 - progress * 0.5
      }
    })

    return () => {
      trigger.kill()
      tl.kill()
    }
  }, [camera, isMobile])

  return (
    <>
      {/* Lighting */}
      {/* @ts-ignore */}
      <ambientLight intensity={0.4} />
      {/* @ts-ignore */}
      <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />

      {/* 3D Object - Low-poly Torus */}
      {/* @ts-ignore */}
      <mesh ref={meshRef} position={[0, 0, 0]}>
        {/* @ts-ignore */}
        <torusGeometry args={[1, 0.4, 16, 100]} />
        {/* @ts-ignore */}
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.2}
        />
      {/* @ts-ignore */}
      </mesh>
    </>
  )
}

// Loading fallback
function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  )
}

// Main Hero3D Component
export default function Hero3D() {
  const canvasRef = useRef<HTMLDivElement | null>(null)
  const [isVisible, setIsVisible] = useState(true)

  // Intersection Observer for pausing animations when off-screen
  useEffect(() => {
    if (!canvasRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )

    observer.observe(canvasRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="hero-section relative h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          dpr={[1, 1.5]}
          frameloop={isVisible ? 'always' : 'demand'}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {/* HTML Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Welcome to the Future
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Experience cutting-edge technology with stunning 3D visuals and smooth animations.
        </p>
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-200 transition-colors duration-300"
        >
          Get Started
        </Button>
      </div>
    </section>
  )
}
