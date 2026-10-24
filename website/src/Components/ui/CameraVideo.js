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
  /** Class name applied to the root container. */
  className,
  /** Inline style applied to the root container. */
  style,
  /** Called when the zoom-to-reveal completes. */
  onReveal,
}) {
  const containerRef = useRef(null)
  const videoRef = useRef(null)
  const lastProgressRef = useRef(null)
  const revealDoneRef = useRef(false)
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
    let isSeeking = false
    let pendingTime = null
    let isLocked = false
    let lockedScrollY = 0
    let touchStartY = 0
    let hasRevealed = false

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
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
        isSeeking = true
        video.currentTime = t
      }
    }
    video.addEventListener("seeked", onSeeked)

    function seekTo(t) {
      if (isSeeking) {
        pendingTime = t
        return
      }
      isSeeking = true
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
      targetProgress = next
      return true
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
    container.addEventListener("touchstart", onTouchStart, { passive: true, capture: true })
    container.addEventListener("touchmove", onTouchMove, { passive: false, capture: true })

    function frame() {
      currentProgress += (targetProgress - currentProgress) * 0.18

      // Notify parent of progress changes (throttled)
      if (onProgress) {
        const last = lastProgressRef.current ?? -1
        const diff = Math.abs(currentProgress - last)
        if (diff > 0.01) {
          onProgress(currentProgress)
          lastProgressRef.current = currentProgress
        }
      }

      // Zoom-to-reveal when video reaches the end
      if (!revealDoneRef.current && currentProgress >= 0.99) {
        revealDoneRef.current = true
        hasRevealed = true

        // Apply zoom animation
        const zoomTarget = zoomScale
        const startTime = performance.now()
        const durationMs = 900

        function animateZoom(now) {
          const elapsed = now - startTime
          const t = clamp(elapsed / durationMs, 0, 1)
          // Ease out cubic
          const eased = 1 - Math.pow(1 - t, 3)
          const scale = 1 + (zoomTarget - 1) * eased
          container.style.transform = `scale(${scale})`
          container.style.transition = "none"

          if (t < 1) {
            requestAnimationFrame(animateZoom)
          } else {
            // Zoom complete — release lock and notify parent
            container.style.transform = `scale(${zoomTarget})`
            container.style.transition = "opacity 0.6s ease"
            container.style.opacity = "0"
            releaseLock()
            if (onReveal) onReveal()
          }
        }
        requestAnimationFrame(animateZoom)
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
      container.removeEventListener("touchstart", onTouchStart, true)
      container.removeEventListener("touchmove", onTouchMove, true)
      cancelAnimationFrame(rafId)
      if (lockUntilEnd) {
        releaseLock()
      }
    }
  }, [lockUntilEnd, zoomScale, onProgress, onReveal])

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
