import { useLayoutEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// CAMERA VIDEO — scroll-locked video with zoom-to-reveal finish
// Body is pinned while the video scrubs.
// Wheel/touch input drives video.currentTime, forward and backward.
// When the video reaches the end, the container zooms in (scale)
// to reveal the portfolio menu underneath, then the page unlocks.
// No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

import cameraExplodeVideo from "../../assets/video/camera-explode.mp4"

const DEFAULT_VIDEO = cameraExplodeVideo

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function CameraVideo({
  videoSrc = DEFAULT_VIDEO,
  /** When true, locks body scroll until video finishes, then releases. */
  lockUntilEnd = false,
  /** Called on each animation frame with current progress (0-1). Throttled to >0.01 changes. */
  onProgress,
  /** Extra scale applied during the zoom-to-reveal at the end. */
  zoomScale = 3,
  initialProgress = 0,
  /** Class name applied to the root container. */
  className,
  /** Inline style applied to the root container. */
  style,
  /** Called when the zoom-to-reveal completes. */
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
    let targetProgress = clamp(initialProgress, 0, 1)
    let currentProgress = targetProgress
    let lastProgressFrameTime = null
    lastProgressRef.current = currentProgress
    let isSeeking = false
    let pendingTime = null
    let lastSeekTime = null
    let isLocked = false
    let lockedScrollY = 0
    let touchStartY = 0
    let hasRevealed = false
    let revealProgress = 0
    let lastFrameTime = null

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
      if (onReady) onReady()
      if (reduceMotion) {
        video.currentTime = duration * 0.95
        currentProgress = 0.95
        targetProgress = 0.95
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    // iOS Safari kickstart
    const kickstartLoad = () => {
      const p = video.play()
      if (p && typeof p.then === "function") {
        p.then(() => video.pause()).catch(() => {})
      } else {
        video.pause()
      }
    }
    kickstartLoad()

    const onSeeked = () => {
      isSeeking = false
      if (pendingTime !== null) {
        const t = pendingTime
        pendingTime = null
        if (Math.abs(t - video.currentTime) >= 1 / 30) {
          isSeeking = true
          lastSeekTime = t
          video.currentTime = t
        }
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t) {
      const previousTime = pendingTime ?? lastSeekTime ?? video.currentTime
      if (Math.abs(t - previousTime) < 1 / 30) return
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
      lastSeekTime = t
      video.currentTime = t
    }

    function engageLock() {
      if (isLocked || typeof document === "undefined") return
      isLocked = true
      lockedScrollY = window.scrollY
      const b = document.body.style
      b.position = "fixed"
      b.top = `-${lockedScrollY}px`
      b.left = "0"
      b.right = "0"
      b.width = "100%"
      b.height = "100%"
      b.overscrollBehavior = "none"
    }

    function releaseLock() {
      if (!isLocked || typeof document === "undefined") return
      isLocked = false
      const y = lockedScrollY
      const b = document.body.style
      b.position = ""
      b.top = ""
      b.left = ""
      b.right = ""
      b.width = ""
      b.height = ""
      b.overscrollBehavior = ""
      window.scrollTo(0, y)
    }

    // Engage lock on mount if lockUntilEnd is true
    if (lockUntilEnd) {
      engageLock()
    }

    function addDelta(deltaY) {
      const next = clamp(targetProgress + deltaY / 2800, 0, 1)
      if (targetProgress === 0 && currentProgress === 0 && next === 0 && deltaY < 0 && onProgress) {
        onProgress(0)
      }
      targetProgress = next
    }

    const onWheel = (e) => {
      addDelta(e.deltaY)
      if (isLocked && !hasRevealed) {
        e.preventDefault()
      }
    }

    const onTouchStart = (e) => {
      touchStartY = e.touches[0] ? e.touches[0].clientY : 0
    }
    const onTouchMove = (e) => {
      const y = e.touches[0] ? e.touches[0].clientY : touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      addDelta(deltaY)
      if (isLocked && !hasRevealed) {
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    function frame(now) {
      const progressElapsed = lastProgressFrameTime === null
        ? 1000 / 60
        : Math.min(now - lastProgressFrameTime, 50)
      lastProgressFrameTime = now
      const remainingProgress = targetProgress - currentProgress
      const smoothing = 1 - Math.pow(1 - 0.18, progressElapsed / (1000 / 60))
      currentProgress = Math.abs(remainingProgress) < 0.001
        ? targetProgress
        : currentProgress + remainingProgress * smoothing

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
      const revealDelta = clamp(
        targetRevealProgress - revealProgress,
        -elapsed / 900,
        elapsed / 900
      )
      revealProgress = clamp(revealProgress + revealDelta, 0, 1)
      const easedRevealProgress = 1 - Math.pow(1 - revealProgress, 3)
      container.style.transform = `scale(${1 + (zoomScale - 1) * easedRevealProgress})`
      container.style.opacity = String(1 - revealProgress)
      container.style.transition = "none"

      if (hasRevealed && currentProgress < 1) {
        hasRevealed = false
        if (onReveal) onReveal(false)
      } else if (!hasRevealed && revealProgress === 1) {
        hasRevealed = true
        if (onReveal) onReveal(true)
      }

      if (duration > 0) {
        seekTo(currentProgress * duration)
      }

      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      cancelAnimationFrame(rafId)
      if (lockUntilEnd) {
        releaseLock()
      }
    }
  }, [lockUntilEnd, zoomScale, initialProgress, onProgress, onReveal, onReady])

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
        touchAction: lockUntilEnd ? "none" : "auto",
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
          touchAction: lockUntilEnd ? "none" : "auto",
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
