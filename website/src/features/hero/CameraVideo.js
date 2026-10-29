import { useLayoutEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// CAMERA VIDEO — autoplay video with zoom-to-reveal finish
// Plays after MetroHero, then zooms in to reveal the portfolio menu.
// No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

import cameraExplodeVideo from "../../assets/video/camera-explode.mp4"

const DEFAULT_VIDEO = cameraExplodeVideo

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function CameraVideo({
  videoSrc = DEFAULT_VIDEO,
  onProgress,
  zoomScale = 3,
  className,
  style,
  onReveal,
  onReady,
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const lastProgressRef = useRef(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    lastProgressRef.current = 0
    let hasRevealed = false
    let revealProgress = 0
    let lastFrameTime = null

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (onReady) onReady()
      if (reduceMotion) {
        video.currentTime = duration
        currentProgress = 1
        targetProgress = currentProgress
      } else {
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((error) => {
            console.error("CameraVideo playback could not start.", error)
          })
        }
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    const onTimeUpdate = () => {
      if (duration > 0) {
        targetProgress = clamp(video.currentTime / duration, 0, 1)
      }
    }
    const onEnded = () => {
      targetProgress = 1
    }
    video.addEventListener("timeupdate", onTimeUpdate)
    video.addEventListener("ended", onEnded)

    function frame(now) {
      if (!reduceMotion && duration > 0) {
        targetProgress = video.ended
          ? 1
          : clamp(video.currentTime / duration, 0, 1)
      }
      currentProgress = targetProgress

      // Notify parent of progress changes (throttled)
      if (onProgress) {
        const last = lastProgressRef.current ?? -1
        const diff = Math.abs(currentProgress - last)
        if (diff > 0.01 || ((currentProgress === 0 || currentProgress === 1) && last !== currentProgress)) {
          onProgress(currentProgress)
          lastProgressRef.current = currentProgress
        }
      }

      const elapsed = lastFrameTime === null ? 0 : now - lastFrameTime
      lastFrameTime = now
      const targetRevealProgress = clamp((currentProgress - 0.99) / 0.01, 0, 1)
      if (reduceMotion) {
        revealProgress = targetRevealProgress
      } else {
        const revealDelta = clamp(
          targetRevealProgress - revealProgress,
          -elapsed / 900,
          elapsed / 900
        )
        revealProgress = clamp(revealProgress + revealDelta, 0, 1)
      }
      const easedRevealProgress = 1 - Math.pow(1 - revealProgress, 3)
      container.style.transform = `scale(${1 + (zoomScale - 1) * easedRevealProgress})`
      container.style.opacity = String(1 - revealProgress)
      container.style.transition = "none"

      if (!hasRevealed && revealProgress === 1) {
        hasRevealed = true
        if (onReveal) onReveal(true)
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
      video.pause()
      cancelAnimationFrame(rafId)
    }
  }, [zoomScale, onProgress, onReveal, onReady])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#08090b",
        transform: "scale(1)",
        transformOrigin: "center center",
        willChange: "transform",
        transition: "opacity 0.6s ease",
        ...style,
      }}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: ready ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: "none",
        }}
      />

      {/* Dark vignette overlay for cinematic feel */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(8,9,11,0.6) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  )
}
