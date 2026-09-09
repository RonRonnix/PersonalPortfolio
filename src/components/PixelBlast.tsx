import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface PixelBlastProps {
  className?: string
  color?: string
  pixelSize?: number
  patternScale?: number
  patternDensity?: number
  speed?: number
  edgeFade?: number
  enableRipples?: boolean
  transparent?: boolean
}

const fragmentShader = `
  precision highp float;

  uniform vec3 uColor;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uPixelSize;
  uniform float uScale;
  uniform float uDensity;
  uniform float uEdgeFade;
  uniform int uEnableRipples;
  uniform vec2 uPointer;
  uniform float uPointerTime;

  float hash(vec2 point) {
    return fract(sin(dot(point, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 point) {
    vec2 cell = floor(point);
    vec2 local = smoothstep(0.0, 1.0, fract(point));
    float bottom = mix(hash(cell), hash(cell + vec2(1.0, 0.0)), local.x);
    float top = mix(hash(cell + vec2(0.0, 1.0)), hash(cell + vec2(1.0, 1.0)), local.x);
    return mix(bottom, top, local.y);
  }

  void main() {
    vec2 centered = gl_FragCoord.xy - uResolution * 0.5;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 uv = centered / uResolution;
    vec2 scaled = vec2(uv.x * aspect, uv.y) * uScale;
    float movingNoise = noise(scaled + vec2(uTime * 0.015, -uTime * 0.01));
    float detail = noise(scaled * 1.8 - uTime * 0.012);
    float rippleDistance = distance(uv, uPointer);
    float ripple = uEnableRipples == 1
      ? exp(-pow((rippleDistance - (uTime - uPointerTime) * 0.12) / 0.025, 2.0))
      : 0.0;

    vec2 pixel = floor(gl_FragCoord.xy / uPixelSize);
    float dither = hash(pixel) - 0.5;
    float coverage = step(0.58, movingNoise * 0.6 + detail * 0.25 + uDensity * 0.2 + dither * 0.08 + ripple * 0.65);
    vec2 normalized = gl_FragCoord.xy / uResolution;
    float edge = min(min(normalized.x, normalized.y), min(1.0 - normalized.x, 1.0 - normalized.y));
    float fade = smoothstep(0.0, uEdgeFade, edge);

    gl_FragColor = vec4(uColor, coverage * fade * 0.34);
  }
`

export default function PixelBlast({
  className = '',
  color = '#94a3b8',
  pixelSize = 5,
  patternScale = 3,
  patternDensity = 0.35,
  speed = 0.35,
  edgeFade = 0.28,
  enableRipples = true,
  transparent = true
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const renderer = new THREE.WebGLRenderer({ alpha: transparent, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.domElement.style.display = 'block'
    renderer.domElement.style.width = '100%'
    renderer.domElement.style.height = '100%'
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      uColor: { value: new THREE.Color(color) },
      uResolution: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uEdgeFade: { value: edgeFade },
      uEnableRipples: { value: enableRipples ? 1 : 0 },
      uPointer: { value: new THREE.Vector2(-2, -2) },
      uPointerTime: { value: -100 }
    }
    const material = new THREE.ShaderMaterial({
      vertexShader: 'void main() { gl_Position = vec4(position, 1.0); }',
      fragmentShader,
      uniforms,
      transparent: true,
      depthWrite: false,
      depthTest: false
    })
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)
    const clock = new THREE.Clock()

    const resize = () => {
      const width = container.clientWidth || 1
      const height = container.clientHeight || 1
      renderer.setSize(width, height, false)
      uniforms.uResolution.value.set(renderer.domElement.width, renderer.domElement.height)
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio()
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!enableRipples) return
      const bounds = renderer.domElement.getBoundingClientRect()
      uniforms.uPointer.value.set(
        (event.clientX - bounds.left) / bounds.width - 0.5,
        0.5 - (event.clientY - bounds.top) / bounds.height
      )
      uniforms.uPointerTime.value = uniforms.uTime.value
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    renderer.domElement.addEventListener('pointerdown', handlePointerDown, { passive: true })
    resize()

    let animationFrame = 0
    const animate = () => {
      uniforms.uTime.value = clock.getElapsedTime() * speed
      renderer.render(scene, camera)
      animationFrame = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      resizeObserver.disconnect()
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown)
      mesh.geometry.dispose()
      material.dispose()
      renderer.dispose()
      renderer.forceContextLoss()
      if (renderer.domElement.parentElement === container) container.removeChild(renderer.domElement)
    }
  }, [color, edgeFade, enableRipples, patternDensity, patternScale, pixelSize, speed, transparent])

  return <div ref={containerRef} className={`absolute inset-0 ${className}`} aria-hidden="true" />
}
