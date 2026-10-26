"use client"

import { motion } from "framer-motion"
import { useReducedMotion } from "@/components/motion/use-reduced-motion"
import { useEffect, useRef } from "react"
import { Float } from "@/components/motion/ambient"

type RGB = [number, number, number]
type Point = { x: number; y: number }
type Circle = Point & { r: number }

const TAU = Math.PI * 2
const TOP = -Math.PI / 2
const ARC_SCALE = 1.08
const DEPTH_BUCKETS = 6
const DPR_CAPS = [2, 1.5, 1.25, 1]

const hexToRgb = (value: string, fallback: RGB): RGB => {
  const m = value.trim().match(/^#?([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i)
  return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : fallback
}
const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`
const mix = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
]
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
/** Approche exponentielle, indépendante du nombre d'images par seconde. */
const damp = (from: number, to: number, k: number, dt: number) => from + (to - from) * (1 - Math.exp(-k * dt))

function radialSprite(stops: [number, string][], size: number) {
  const c = document.createElement("canvas")
  c.width = c.height = size
  const g = c.getContext("2d")!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  for (const [o, col] of stops) grad.addColorStop(o, col)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

/** Sphère de Fibonacci : 130 nœuds répartis uniformément, reliés à leurs voisins proches. */
function buildSphere(count: number, linkDistance: number) {
  const nodes: { x: number; y: number; z: number }[] = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const radius = Math.sqrt(1 - y * y)
    nodes.push({ x: Math.cos(golden * i) * radius, y, z: Math.sin(golden * i) * radius })
  }
  const edges: [number, number][] = []
  const max = linkDistance * linkDistance
  for (let a = 0; a < count; a++)
    for (let b = a + 1; b < count; b++) {
      const dx = nodes[a].x - nodes[b].x
      const dy = nodes[a].y - nodes[b].y
      const dz = nodes[a].z - nodes[b].z
      if (dx * dx + dy * dy + dz * dz < max) edges.push([a, b])
    }
  return { nodes, edges }
}

function startAnimation(container: HTMLDivElement, canvas: HTMLCanvasElement, dialCanvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d")
  if (!ctx) return () => {}
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

  // Couleurs lues dans la charte (variables CSS)
  const css = getComputedStyle(document.documentElement)
  const col = {
    brand: hexToRgb(css.getPropertyValue("--brand"), [51, 85, 255]),
    brand2: hexToRgb(css.getPropertyValue("--brand-2"), [122, 92, 255]),
    time: hexToRgb(css.getPropertyValue("--time"), [15, 165, 140]),
    ink: hexToRgb(css.getPropertyValue("--ink"), [11, 13, 18]),
  }
  const sprites = {
    core: radialSprite([[0, "rgba(255,255,255,1)"], [0.3, rgba(col.brand, 0.8)], [1, rgba(col.brand2, 0)]], 128),
    blue: radialSprite([[0, rgba(col.brand, 1)], [0.25, rgba(col.brand, 0.55)], [1, rgba(col.brand, 0)]], 32),
    teal: radialSprite([[0, rgba(col.time, 1)], [0.25, rgba(col.time, 0.55)], [1, rgba(col.time, 0)]], 32),
  }
  const edgeColors = Array.from({ length: DEPTH_BUCKETS }, (_, i) => {
    const h = (i + 0.5) / DEPTH_BUCKETS
    return rgba(mix(col.brand, col.brand2, h), 0.05 + (1 - h) * 0.32)
  })
  const nodeColors = Array.from({ length: DEPTH_BUCKETS }, (_, i) =>
    rgba(i % 2 ? col.brand2 : col.brand, 0.25 + (1 - (i + 0.5) / DEPTH_BUCKETS) * 0.75)
  )
  const pal = {
    flowLine: rgba(col.ink, 0.13),
    ring: rgba(col.ink, 0.2),
    minor: rgba(col.ink, 0.18),
    major: rgba(col.ink, 0.45),
    arcSoft: rgba(col.time, 0.18),
    arcLine: rgba(col.time, 1),
    time: rgba(col.time, 1),
    hand: rgba(col.ink, 0.85),
    orbit: rgba(col.brand2, 0.3),
    dial: rgba(col.ink, 0.025),
    satellite: rgba(col.brand2, 1),
  }

  const drawSprite = (img: HTMLCanvasElement, x: number, y: number, size: number, alpha = 1) => {
    if (alpha <= 0) return
    ctx.globalAlpha = alpha
    ctx.drawImage(img, x - size / 2, y - size / 2, size, size)
    ctx.globalAlpha = 1
  }

  const { nodes, edges } = buildSphere(130, 0.38)
  const px = new Float32Array(nodes.length)
  const py = new Float32Array(nodes.length)
  const pz = new Float32Array(nodes.length)
  const edgeBucket = new Uint8Array(edges.length)
  const nodeBucket = new Uint8Array(nodes.length)

  // État
  let width = 0
  let height = 0
  let dpr = 1
  let dprLevel = 0
  let frames = 0
  let slowFrames = 0
  let rectLeft = 0
  let rectTop = 0
  let raf = 0
  let running = false
  let visible = true
  let lastTime = 0
  let clock = 0 // temps cumulé (s)
  let tiltX = 0
  let tiltY = 0
  let targetTiltX = 0
  let targetTiltY = 0
  let fillTarget = 0 // part de l'horloge à remplir
  let fill = 0
  let handAngle = 0
  let pulse = 0
  let resetProgress = -1 // -1 : pas de remise à zéro en cours
  let resetHandStart = 0
  let resetFillStart = 0
  let flowTimer = 0
  let sparkTimer = 0
  let dialCache: HTMLCanvasElement | null = null
  let wedgeGradient: CanvasGradient | null = null
  let dialX = NaN
  let dialY = NaN
  const flows: { u: number; v: number; off: number }[] = []
  const sparks: { e: number; p: number; v: number }[] = []
  const ripples: { a: number; s: number }[] = []

  const brain: Circle = { x: 0, y: 0, r: 0 }
  const dial: Circle = { x: 0, y: 0, r: 0 }
  const arcEnd: Point = { x: 0, y: 0 }
  const tmp: Point = { x: 0, y: 0 }
  const p0: Point = { x: 0, y: 0 }
  const p1: Point = { x: 0, y: 0 }
  const p2: Point = { x: 0, y: 0 }

  const resize = () => {
    // Taille de mise en page (clientWidth/Height) et non getBoundingClientRect : le conteneur apparaît
    // avec une animation de zoom (scale 0,96 → 1). Mesuré pendant ce zoom, le canvas gardait une taille
    // trop petite, étirée ensuite par le CSS, et le cadran (canvas séparé) se décalait de l'arc et des aiguilles.
    const rect = container.getBoundingClientRect()
    dpr = Math.min(window.devicePixelRatio || 1, DPR_CAPS[dprLevel])
    width = container.clientWidth
    height = container.clientHeight
    rectLeft = rect.left
    rectTop = rect.top
    dialCache = null
    wedgeGradient = null
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const layout = () => {
    const min = Math.min(width, height)
    brain.x = width * 0.34 + tiltX * 10
    brain.y = height * 0.39 + tiltY * 10
    brain.r = min * 0.255
    dial.x = width * 0.75 - tiltX * 7
    dial.y = height * 0.71 - tiltY * 7
    dial.r = min * 0.19
  }

  const drawRipples = (center: Point, dt: number, radius: number) => {
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i]
      r.s += dt * 0.3
      r.a -= dt * 0.4
      if (r.a <= 0) {
        ripples.splice(i, 1)
        continue
      }
      ctx.lineWidth = 1.2
      ctx.strokeStyle = rgba(col.time, r.a)
      ctx.beginPath()
      ctx.arc(center.x, center.y, radius * r.s, 0, TAU)
      ctx.stroke()
    }
  }

  /** Cadran fixe (graduations) rendu une fois sur un canvas séparé, déplacé en CSS. */
  const renderDial = (r: number) => {
    const size = Math.ceil((r + 4) * 2 * dpr)
    dialCanvas.width = dialCanvas.height = size
    dialCanvas.style.width = dialCanvas.style.height = `${size / dpr}px`
    dialX = dialY = NaN
    const g = dialCanvas.getContext("2d")!
    g.scale(dpr, dpr)
    g.translate(r + 4, r + 4)
    g.fillStyle = pal.dial
    g.beginPath()
    g.arc(0, 0, r, 0, TAU)
    g.fill()
    for (const major of [false, true]) {
      g.beginPath()
      for (let i = 0; i < 60; i++) {
        if ((i % 5 === 0) !== major) continue
        const a = TOP + (i / 60) * TAU
        const inner = r * (major ? 0.82 : 0.89)
        const outer = r * 0.95
        g.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
        g.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
      }
      g.lineWidth = major ? 2 : 1
      g.strokeStyle = major ? pal.major : pal.minor
      g.stroke()
    }
    g.strokeStyle = pal.ring
    g.lineWidth = 1.2
    g.beginPath()
    g.arc(0, 0, r, 0, TAU)
    g.stroke()
    return dialCanvas
  }

  const drawClock = (c: Circle, endAngle: number, end: Point, dt: number) => {
    const r = c.r
    if (!dialCache) dialCache = renderDial(r)
    const half = dialCache.width / dpr / 2
    const dx = Math.round((c.x - half) * 10) / 10
    const dy = Math.round((c.y - half) * 10) / 10
    if (dx !== dialX || dy !== dialY) {
      dialX = dx
      dialY = dy
      dialCanvas.style.transform = `translate3d(${dx}px, ${dy}px, 0)`
    }

    ctx.save()
    ctx.translate(c.x, c.y)
    if (fill > 0.002) {
      if (!wedgeGradient) {
        wedgeGradient = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
        wedgeGradient.addColorStop(0, rgba(col.time, 0.02))
        wedgeGradient.addColorStop(1, rgba(col.time, 0.16))
      }
      ctx.fillStyle = wedgeGradient
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, TOP, endAngle)
      ctx.closePath()
      ctx.fill()
    }

    // Graduations « gagnées », colorées au fil du remplissage
    const ticks = fill * 60
    const whole = Math.floor(ticks)
    ctx.strokeStyle = pal.time
    ctx.globalAlpha = 0.95
    for (const major of [false, true]) {
      ctx.beginPath()
      for (let i = 0; i < Math.min(whole, 60); i++) {
        if ((i % 5 === 0) !== major) continue
        const a = TOP + (i / 60) * TAU
        const inner = r * (major ? 0.82 : 0.89)
        const outer = r * 0.95
        ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
        ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
      }
      ctx.lineWidth = major ? 2 : 1
      ctx.stroke()
    }
    if (whole < 60 && ticks - whole > 0.01) {
      const major = whole % 5 === 0
      const a = TOP + (whole / 60) * TAU
      const inner = r * (major ? 0.82 : 0.89)
      const outer = r * 0.95
      ctx.globalAlpha = 0.95 * (ticks - whole)
      ctx.lineWidth = major ? 2 : 1
      ctx.beginPath()
      ctx.moveTo(Math.cos(a) * inner, Math.sin(a) * inner)
      ctx.lineTo(Math.cos(a) * outer, Math.sin(a) * outer)
      ctx.stroke()
    }
    ctx.globalAlpha = 1

    if (fill > 0.002) {
      ctx.lineCap = "round"
      ctx.strokeStyle = pal.arcSoft
      ctx.lineWidth = 10
      ctx.beginPath()
      ctx.arc(0, 0, r * ARC_SCALE, TOP, endAngle)
      ctx.stroke()
      ctx.strokeStyle = pal.arcLine
      ctx.lineWidth = 3.5
      ctx.beginPath()
      ctx.arc(0, 0, r * ARC_SCALE, TOP, endAngle)
      ctx.stroke()
      ctx.lineCap = "butt"
    }
    ctx.restore()

    if (fill > 0.002) {
      drawSprite(sprites.teal, end.x, end.y, 26 + pulse * 14, 0.9)
      ctx.fillStyle = pal.time
      ctx.beginPath()
      ctx.arc(end.x, end.y, 4.5, 0, TAU)
      ctx.fill()
    }
    drawRipples(c, dt, r * ARC_SCALE)

    // Aiguilles
    ctx.strokeStyle = pal.hand
    ctx.lineCap = "round"
    const hand = (angle: number, length: number, lineWidth: number) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      ctx.lineWidth = lineWidth
      ctx.beginPath()
      ctx.moveTo(c.x - cos * length * 0.14, c.y - sin * length * 0.14)
      ctx.lineTo(c.x + cos * length, c.y + sin * length)
      ctx.stroke()
    }
    hand(TOP + handAngle / 12 + 2.1, r * 0.48, 3.2)
    hand(TOP + handAngle, r * 0.72, 2)
    ctx.lineCap = "butt"
    ctx.fillStyle = pal.time
    ctx.beginPath()
    ctx.arc(c.x, c.y, 4.5, 0, TAU)
    ctx.fill()
  }

  const frame = (dt: number) => {
    ctx.clearRect(0, 0, width, height)
    layout()

    // Remplissage de l'horloge, puis retour à zéro en tournant les aiguilles à l'envers
    if (resetProgress < 0) {
      fill = damp(fill, fillTarget, 3.2, dt)
      handAngle += dt * 0.3
      if (fill > 0.996) {
        resetProgress = 0
        resetHandStart = handAngle
        resetFillStart = fill
        ripples.push({ a: 0.5, s: 1 })
      }
    } else {
      resetProgress = Math.min(1, resetProgress + dt / 1.9)
      const e = easeInOutCubic(resetProgress)
      handAngle = resetHandStart - e * Math.PI * 4
      fill = resetFillStart * (1 - e)
      if (resetProgress >= 1) {
        resetProgress = -1
        fillTarget = 0
        fill = 0
      }
    }
    const endAngle = TOP + fill * TAU
    arcEnd.x = dial.x + Math.cos(endAngle) * dial.r * ARC_SCALE
    arcEnd.y = dial.y + Math.sin(endAngle) * dial.r * ARC_SCALE
    p0.x = brain.x
    p0.y = brain.y
    p1.x = brain.x + brain.r * 1.55
    p1.y = brain.y - brain.r * 0.35
    p2.x = dial.x - dial.r * 2.1
    p2.y = dial.y - dial.r * 1.5
    const bezier = (t: number, to: Point) => {
      const s = 1 - t
      tmp.x = s * s * s * p0.x + 3 * s * s * t * p1.x + 3 * s * t * t * p2.x + t * t * t * to.x
      tmp.y = s * s * s * p0.y + 3 * s * s * t * p1.y + 3 * s * t * t * p2.y + t * t * t * to.y
      return tmp
    }

    // Chemin pointillé entre le réseau et l'horloge
    ctx.save()
    ctx.setLineDash([2, 8])
    ctx.lineWidth = 1
    ctx.strokeStyle = pal.flowLine
    ctx.beginPath()
    ctx.moveTo(p0.x, p0.y)
    ctx.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, arcEnd.x, arcEnd.y)
    ctx.stroke()
    ctx.restore()

    flowTimer -= dt
    if (flowTimer <= 0 && resetProgress < 0) {
      flows.push({ u: 0, v: 0.36 + Math.random() * 0.16, off: (Math.random() - 0.5) * 2 })
      flowTimer = 0.17 + Math.random() * 0.1
    }

    // Projection de la sphère en rotation
    const breath = 1 + Math.sin(clock * 1.6) * 0.05
    const yaw = clock * 0.2 + tiltX * 0.9
    const pitch = -0.32 + tiltY * 0.5
    const cy = Math.cos(yaw)
    const sy = Math.sin(yaw)
    const cp = Math.cos(pitch)
    const sp = Math.sin(pitch)
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i]
      const x = n.x * cy + n.z * sy
      const z0 = -n.x * sy + n.z * cy
      const y = n.y * cp - z0 * sp
      const z = n.y * sp + z0 * cp
      const persp = 3.2 / (3.2 + z)
      px[i] = brain.x + x * brain.r * persp
      py[i] = brain.y + y * brain.r * persp
      pz[i] = z
      nodeBucket[i] = Math.min(DEPTH_BUCKETS - 1, Math.floor(((z + 1) / 2) * DEPTH_BUCKETS))
    }
    for (let i = 0; i < edges.length; i++) {
      const z = (pz[edges[i][0]] + pz[edges[i][1]]) / 2
      edgeBucket[i] = Math.min(DEPTH_BUCKETS - 1, Math.floor(((z + 1) / 2) * DEPTH_BUCKETS))
    }
    ctx.lineWidth = 0.8
    for (let b = 0; b < DEPTH_BUCKETS; b++) {
      ctx.strokeStyle = edgeColors[b]
      ctx.beginPath()
      for (let i = 0; i < edges.length; i++) {
        if (edgeBucket[i] !== b) continue
        const [a, c] = edges[i]
        ctx.moveTo(px[a], py[a])
        ctx.lineTo(px[c], py[c])
      }
      ctx.stroke()
    }
    for (let b = 0; b < DEPTH_BUCKETS; b++) {
      ctx.fillStyle = nodeColors[b]
      ctx.beginPath()
      for (let i = 0; i < nodes.length; i++) {
        if (nodeBucket[i] !== b) continue
        const size = 0.8 + (1 - (pz[i] + 1) / 2) * 2.1
        ctx.moveTo(px[i] + size, py[i])
        ctx.arc(px[i], py[i], size, 0, TAU)
      }
      ctx.fill()
    }

    // Étincelles qui parcourent les liaisons de la face avant
    for (sparkTimer -= dt; sparkTimer <= 0; sparkTimer += 0.05) {
      if (sparks.length < 28)
        sparks.push({ e: Math.floor(Math.random() * edges.length), p: 0, v: 1.1 + Math.random() * 1.2 })
    }
    for (let i = sparks.length - 1; i >= 0; i--) {
      const s = sparks[i]
      s.p += s.v * dt
      if (s.p >= 1) {
        sparks.splice(i, 1)
        continue
      }
      const [a, c] = edges[s.e]
      if ((pz[a] + pz[c]) / 2 > 0.2) continue
      drawSprite(sprites.blue, px[a] + (px[c] - px[a]) * s.p, py[a] + (py[c] - py[a]) * s.p, 12, Math.sin(s.p * Math.PI))
    }
    drawSprite(sprites.core, brain.x, brain.y, brain.r * 0.75 * breath)

    // Orbite et satellite
    ctx.save()
    ctx.translate(brain.x, brain.y)
    ctx.rotate(-0.38)
    ctx.strokeStyle = pal.orbit
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.ellipse(0, 0, brain.r * 1.32, brain.r * 0.36, 0, 0, TAU)
    ctx.stroke()
    const sat = clock * 0.8
    ctx.fillStyle = pal.satellite
    ctx.beginPath()
    ctx.arc(Math.cos(sat) * brain.r * 1.32, Math.sin(sat) * brain.r * 0.36, 3, 0, TAU)
    ctx.fill()
    ctx.restore()

    // Particules : bleu (IA) en partant, vert (temps) en arrivant
    for (let i = flows.length - 1; i >= 0; i--) {
      const f = flows[i]
      f.u += f.v * dt
      if (f.u >= 1) {
        flows.splice(i, 1)
        if (resetProgress < 0) {
          fillTarget = Math.min(1, fillTarget + 0.022)
          pulse = 1
          if (ripples.length < 4) ripples.push({ a: 0.22, s: 1 })
        }
        continue
      }
      const t = easeInOutSine(f.u)
      const p = bezier(t, arcEnd)
      const wobble = Math.sin(t * Math.PI) * f.off * 9
      const size = 9 + Math.sin(t * Math.PI) * 9
      drawSprite(sprites.blue, p.x, p.y + wobble, size, 1 - t)
      drawSprite(sprites.teal, p.x, p.y + wobble, size, t)
    }
    pulse = damp(pulse, 0, 5, dt)
    drawClock(dial, endAngle, arcEnd, dt)
  }

  const loop = (now: number) => {
    const elapsed = now - lastTime
    const dt = Math.min(0.05, elapsed / 1000)
    lastTime = now
    // Baisse la résolution si l'appareil peine à suivre
    const ratio = window.devicePixelRatio || 1
    if (dprLevel < DPR_CAPS.length - 1 && Math.min(ratio, DPR_CAPS[dprLevel + 1]) < dpr) {
      frames++
      if (elapsed > 20) slowFrames++
      if (frames >= 90) {
        if (slowFrames > 30) {
          dprLevel++
          resize()
        }
        frames = slowFrames = 0
      }
    }
    clock += dt
    tiltX = damp(tiltX, targetTiltX, 4, dt)
    tiltY = damp(tiltY, targetTiltY, 4, dt)
    frame(dt)
    raf = requestAnimationFrame(loop)
  }

  const start = () => {
    if (running || reducedMotion.matches || !visible || document.hidden) return
    running = true
    lastTime = performance.now()
    raf = requestAnimationFrame(loop)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(raf)
  }
  const drawStill = () => {
    clock = 7
    handAngle = 1.1
    fillTarget = fill = 0.62
    frame(0)
  }

  const onPointer = (e: PointerEvent) => {
    if (!running) return
    const clamp = (v: number) => Math.max(-1, Math.min(1, v))
    targetTiltX = clamp((e.clientX - (rectLeft + width / 2)) / (width / 1.2))
    targetTiltY = clamp((e.clientY - (rectTop + height / 2)) / (height / 1.2))
  }
  let scrollRaf = 0
  const onScroll = () => {
    if (scrollRaf) return
    scrollRaf = requestAnimationFrame(() => {
      scrollRaf = 0
      const rect = container.getBoundingClientRect()
      rectLeft = rect.left
      rectTop = rect.top
    })
  }
  const onMotionChange = () => {
    if (reducedMotion.matches) {
      stop()
      drawStill()
    } else start()
  }
  const onVisibility = () => (document.hidden ? stop() : start())

  const resizeObserver = new ResizeObserver(() => {
    resize()
    if (!running) drawStill()
  })
  resizeObserver.observe(container)
  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) start()
    else stop()
  })
  io.observe(container)

  resize()
  if (reducedMotion.matches) drawStill()
  else start()
  window.addEventListener("pointermove", onPointer, { passive: true })
  window.addEventListener("scroll", onScroll, { passive: true })
  document.addEventListener("visibilitychange", onVisibility)
  reducedMotion.addEventListener("change", onMotionChange)

  return () => {
    stop()
    resizeObserver.disconnect()
    io.disconnect()
    cancelAnimationFrame(scrollRaf)
    window.removeEventListener("pointermove", onPointer)
    window.removeEventListener("scroll", onScroll)
    document.removeEventListener("visibilitychange", onVisibility)
    reducedMotion.removeEventListener("change", onMotionChange)
  }
}

function Label({ tone, title, text, className, delay }: { tone: "ai" | "time"; title: string; text: string; className: string; delay?: number }) {
  return (
    <Float
      delay={delay}
      aria-hidden="true"
      className={`absolute flex items-center gap-2.5 rounded-[14px] border border-line bg-surface/95 px-3.5 py-2.5 text-[13px] font-medium text-ink-2 shadow-soft ${className}`}
    >
      <i
        className={
          tone === "ai"
            ? "size-2 rounded-full bg-brand shadow-[0_0_12px_var(--brand)]"
            : "size-2 rounded-full bg-time shadow-[0_0_12px_var(--time)]"
        }
      />
      <span>
        <strong className="font-semibold text-ink">{title}</strong> · {text}
      </span>
    </Float>
  )
}

/** Réseau neuronal (l'IA) qui alimente une horloge dont l'arc de temps gagné se remplit. */
export function HeroVisual() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dialRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current || !dialRef.current) return
    return startAnimation(containerRef.current, canvasRef.current, dialRef.current)
  }, [])

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Illustration animée : un réseau neuronal, symbole de l'intelligence artificielle, alimente une horloge dont l'arc de temps gagné se remplit."
      className="relative aspect-[1/0.92] w-full"
    >
      <motion.div
        aria-hidden="true"
        style={{ x: "-50%", y: "-50%" }}
        animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 3.9, ease: "easeInOut", repeat: Infinity }}
        className="pointer-events-none absolute top-[39%] left-[34%] aspect-square w-[61%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--brand)_28%,transparent),color-mix(in_srgb,var(--brand-2)_10%,transparent)_45%,transparent)] will-change-transform"
      />
      <canvas ref={dialRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0 will-change-transform" />
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 size-full" />
      <Label tone="ai" title="IA" text="traite, extrait, vérifie" className="top-[2%] left-0" />
      <Label tone="time" title="Temps" text="rendu à vos équipes" className="right-0 bottom-0" delay={3.5} />
    </div>
  )
}
