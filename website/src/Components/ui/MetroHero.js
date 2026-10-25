import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// THE CITY OPENS — locked scroll-scrub video hero
// Body is pinned with position:fixed while video scrubs.
// Wheel/touch input drives video.currentTime, forward and backward.
// Once the video reaches the end, the page unlocks and continues
// normally — user can scroll past to other components.
// No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const DEFAULT_SIGNATURE = { name: "guglielmogiannattasio.exe", url: "https://www.guglielmogiannattasio.it" }
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"
const AMBIENT_LOOP_SECONDS = 1

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "Every door in the city is already open.",
  signature = DEFAULT_SIGNATURE,
  scrubDistance = 3200,
  className,
  style,
  initialProgress = 0,
  interactive = true,
  /** When true, locks body scroll until video finishes, then releases. */
  lockUntilEnd = false,
  /** Called on each animation frame with current progress (0-1). Throttled to >0.01 changes. */
  onProgress,
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const hintRef = useRef(null)
  const taglineRef = useRef(null)
  const lastProgressRef = useRef(null)
  const lockReleasedRef = useRef(false)
  const interactiveRef = useRef(interactive)
  interactiveRef.current = interactive
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current
    if (!video || !section) return

    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let duration = 0
    let ambientLoopEnd = 0
    let ambientMode = false
    let scrubStartTime = initialProgress > 0 ? 0 : null
    let scrubStarted = initialProgress > 0
    let userHasStartedScrubbing = false
    let rafId = 0
    let targetProgress = clamp(initialProgress, 0, 1)
    let currentProgress = targetProgress
    let lastFrameTime = null
    lastProgressRef.current = currentProgress
    let hasStartedScrolling = false
    let isSeeking = false
    let pendingTime = null
    let lastSeekTime = null
    let isLocked = false
    let lockedScrollY = 0
    let touchStartY = 0

    const onLoadedData = () => {
      duration = video.duration || 0
      ambientLoopEnd = Math.max(0, Math.min(AMBIENT_LOOP_SECONDS, duration - 0.05))
      if (reduceMotion) {
        video.currentTime = duration * 0.92
        currentProgress = 0.92
        targetProgress = 0.92
        setReady(true)
      } else if (initialProgress > 0 && duration > 0) {
        const initialTime = clamp(initialProgress, 0, 1) * duration
        lastSeekTime = initialTime
        isSeeking = true
        video.currentTime = initialTime
      } else {
        setReady(true)
        if (initialProgress === 0 && !userHasStartedScrubbing) {
          ambientMode = true
          const playPromise = video.play()
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch((error) => {
              console.warn("MetroHero ambient playback could not start.", error)
            })
          }
        } else if (initialProgress === 0) {
          scrubStartTime = video.currentTime
          scrubStarted = true
        }
      }
    }
    video.addEventListener("loadeddata", onLoadedData)

    const onTimeUpdate = () => {
      if (ambientMode && ambientLoopEnd > 0 && video.currentTime >= ambientLoopEnd) {
        video.currentTime = 0
      }
    }
    video.addEventListener("timeupdate", onTimeUpdate)

    const onSeeked = () => {
      isSeeking = false
      setReady(true)
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
      if (!interactiveRef.current) return
      if (deltaY !== 0) {
        userHasStartedScrubbing = true
      }
      if (deltaY !== 0 && ambientMode) {
        video.pause()
        scrubStartTime = video.currentTime
        lastSeekTime = scrubStartTime
        pendingTime = null
        isSeeking = false
        ambientMode = false
        scrubStarted = true
      }
      const next = clamp(targetProgress + deltaY / scrubDistance, 0, 1)
      if (targetProgress === 1 && currentProgress === 1 && next === 1 && deltaY > 0 && onProgress) {
        onProgress(1)
      }
      targetProgress = next
      if (targetProgress > 0.001) hasStartedScrolling = true
    }

    const onWheel = (e) => {
      addDelta(e.deltaY)
      // Only prevent default while locked
      if (isLocked) {
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
      // Only prevent default while locked
      if (isLocked) {
        e.preventDefault()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    function frame(now) {
      const elapsed = lastFrameTime === null ? 1000 / 60 : Math.min(now - lastFrameTime, 50)
      lastFrameTime = now
      const remainingProgress = targetProgress - currentProgress
      const smoothing = 1 - Math.pow(1 - 0.18, elapsed / (1000 / 60))
      currentProgress = Math.abs(remainingProgress) < 0.001
        ? targetProgress
        : currentProgress + remainingProgress * smoothing

      if (ambientMode && ambientLoopEnd > 0 && video.currentTime >= ambientLoopEnd) {
        video.currentTime = 0
      }

      // Notify parent of progress changes (throttled)
      if (interactiveRef.current && onProgress) {
        const last = lastProgressRef.current ?? -1
        const diff = Math.abs(currentProgress - last)
        if (diff > 0.01 || ((currentProgress === 0 || currentProgress === 1) && last !== currentProgress)) {
          onProgress(currentProgress)
          lastProgressRef.current = currentProgress
        }
      }

      // Release scroll lock when video reaches the end
      if (lockUntilEnd && !lockReleasedRef.current && currentProgress >= 0.99) {
        lockReleasedRef.current = true
        releaseLock()
        // Unlock touch interactions so page can scroll past
        if (sectionRef.current) {
          sectionRef.current.style.touchAction = 'auto'
        }
        if (videoRef.current) {
          videoRef.current.style.touchAction = 'auto'
        }
      }

      if (duration > 0 && !ambientMode) {
        const startTime = scrubStartTime ?? 0
        seekTo(startTime + currentProgress * (duration - startTime))
      }

      if (
        scrubStarted &&
        !ambientMode &&
        targetProgress === 0 &&
        currentProgress === 0 &&
        !isSeeking &&
        pendingTime === null &&
        Math.abs(video.currentTime - (scrubStartTime ?? 0)) < 1 / 30
      ) {
        ambientMode = true
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch((error) => {
            console.warn("MetroHero ambient playback could not resume.", error)
          })
        }
      }

      if (videoRef.current) {
        const scale = 1 + currentProgress * 0.06
        videoRef.current.style.transform = `scale(${scale})`
      }
      if (titleRef.current) {
        const t = 1 - clamp(currentProgress / 0.35, 0, 1)
        titleRef.current.style.opacity = String(t)
        titleRef.current.style.transform = `translateY(${(1 - t) * -24}px) scale(${0.96 + t * 0.04})`
        titleRef.current.style.filter = `blur(${(1 - t) * 10}px)`
      }
      if (hintRef.current) {
        hintRef.current.style.opacity = hasStartedScrolling ? "0" : "1"
      }
      if (taglineRef.current) {
        const t = clamp((currentProgress - 0.82) / 0.18, 0, 1)
        taglineRef.current.style.opacity = String(t)
        taglineRef.current.style.transform = `translateY(${(1 - t) * 20}px) scale(${0.97 + t * 0.03})`
        taglineRef.current.style.filter = `blur(${(1 - t) * 8}px)`
      }
      rafId = requestAnimationFrame(frame)
    }

    if (!reduceMotion) {
      rafId = requestAnimationFrame(frame)
    }

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("seeked", onSeeked)
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
      cancelAnimationFrame(rafId)
      if (lockUntilEnd) {
        releaseLock()
      }
    }
  }, [scrubDistance, lockUntilEnd, initialProgress, onProgress])

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        position: "relative",
        height: "100dvh",
        width: "100%",
        overflow: "hidden",
        background: COL_BG,
        touchAction: lockUntilEnd ? "none" : "auto",
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
          transformOrigin: "center center",
          willChange: "transform",
          transition: "opacity 0.6s ease",
          touchAction: lockUntilEnd ? "none" : "auto",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(5,7,13,0.35), rgba(5,7,13,0) 30%, rgba(5,7,13,0.15) 70%, rgba(5,7,13,0.55))",
          pointerEvents: "none",
        }}
      />

      <div
        ref={titleRef}
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 6%",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        <span
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: "clamp(30px, 7vw, 96px)",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: COL_TEXT,
            textShadow: "0 4px 30px rgba(0,0,0,0.5)",
            display: "inline-block",
            willChange: "transform, filter, opacity",
          }}
        >
          {title}
        </span>
      </div>

      {tagline && (
        <div
          ref={taglineRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8%",
            textAlign: "center",
            opacity: 0,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: SANS,
              fontWeight: 700,
              fontSize: "clamp(20px, 3.4vw, 40px)",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
              color: COL_TEXT,
              textShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            {tagline}
          </span>
        </div>
      )}

      <div
        ref={hintRef}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "clamp(20px, 6vh, 48px)",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          color: "rgba(240,244,248,0.75)",
          fontFamily: SANS,
          fontSize: "clamp(10px, 1.4vw, 12px)",
          fontWeight: 600,
          letterSpacing: "0.3em",
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
      >
        <span>{scrollHint}</span>
        <svg width="14" height="18" viewBox="0 0 14 18" style={{ animation: "metro-hero-bounce 1.6s ease-in-out infinite" }}>
          <style>{`
            @keyframes metro-hero-bounce {
              0%, 100% { transform: translateY(0); opacity: 0.5; }
              50% { transform: translateY(5px); opacity: 1; }
            }
          `}</style>
          <path d="M7 1 L7 17 M2 12 L7 17 L12 12" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {signature && (
        <span
          style={{
            position: "absolute",
            right: "clamp(12px, 2.5vw, 24px)",
            bottom: "clamp(10px, 2vw, 18px)",
            fontFamily: SANS,
            fontWeight: 500,
            fontSize: "clamp(11px, 1.4vw, 13px)",
            letterSpacing: "0.01em",
            color: "rgba(220,224,232,0.6)",
            zIndex: 2,
          }}
        >
          by{" "}
          <a
            href={signature.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(220,224,232,0.6)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = COL_TEXT
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(220,224,232,0.6)"
            }}
          >
            {signature.name}
          </a>
        </span>
      )}
    </div>
  )
}
