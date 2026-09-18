import { useEffect, useRef, useState } from 'react'
import './intro.css'

interface IntroProps {
  onFinish: () => void
  duration?: number
}

export default function Intro({ onFinish, duration = 3800 }: IntroProps) {
  const [progress, setProgress] = useState(0)
  const [isLeaving, setIsLeaving] = useState(false)
  const finishedRef = useRef(false)

  const finish = () => {
    if (finishedRef.current) return
    finishedRef.current = true
    setIsLeaving(true)
    setTimeout(onFinish, 300)
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const effectiveDuration = prefersReducedMotion ? 400 : duration

    const start = performance.now()
    let frameId: number

    const tick = (now: number) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / effectiveDuration) * 100)
      setProgress(pct)

      if (pct >= 100) {
        finish()
      } else {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration])

  return (
    <div className={`intro-root${isLeaving ? ' is-leaving' : ''}`}>
      <button type="button" className="intro-skip" onClick={finish}>
        <span>Saltar animación</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m13 5 7 7-7 7M5 5l7 7-7 7" />
        </svg>
      </button>

      <div className="intro-glow" aria-hidden="true" />