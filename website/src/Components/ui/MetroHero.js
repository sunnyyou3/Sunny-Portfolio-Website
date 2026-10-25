import { useEffect, useRef, useState } from "react"

// ─────────────────────────────────────────────────────────────
// THE CITY OPENS — one-gesture video hero
// A downward wheel or touch gesture starts native playback.
// Progress is reported while the video plays forward to completion.
// No dependencies, system fonts only.
// ─────────────────────────────────────────────────────────────

const DEFAULT_VIDEO = "https://cdn.21st.dev/assets/mirror/21/21a77eac28eacbb7e142016eefeaa0b4a766619e51113629a3bc6df6af066c0f.mp4"
const DEFAULT_SIGNATURE = { name: "guglielmogiannattasio.exe", url: "https://www.guglielmogiannattasio.it" }
const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

const COL_BG = "#05070d"
const COL_TEXT = "#f2f4f8"

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

export default function MetroHero({
  videoSrc = DEFAULT_VIDEO,
  title = "THE CITY OPENS",
  scrollHint = "SCROLL",
  tagline = "Every door in the city is already open.",
  signature = DEFAULT_SIGNATURE,
  handoffLeadTime = 0,
  className,
  style,
  onHandoffStart,
  onProgress,
}) {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const titleRef = useRef(null)
  const hintRef = useRef(null)
  const taglineRef = useRef(null)
  const lastProgressRef = useRef(null)
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
    let rafId = 0
    let targetProgress = 0
    let currentProgress = 0
    lastProgressRef.current = 0
    let hasStartedScrolling = false
    let hasStartedPlayback = false
    let hasStartedHandoff = false
    let touchStartY = 0
    let removeStartListeners = () => {}

    const onLoadedData = () => {
      duration = video.duration || 0
      setReady(true)
    }
    video.addEventListener("loadeddata", onLoadedData)
    if (video.readyState >= 2) onLoadedData()

    const onTimeUpdate = () => {
      if (duration > 0) targetProgress = clamp(video.currentTime / duration, 0, 1)
    }
    video.addEventListener("timeupdate", onTimeUpdate)

    const onEnded = () => {
      targetProgress = 1
    }
    video.addEventListener("ended", onEnded)

    function startPlayback() {
      if (hasStartedPlayback) return
      hasStartedPlayback = true
      hasStartedScrolling = true

      if (reduceMotion) {
        removeStartListeners()
        targetProgress = 1
        currentProgress = 1
        lastProgressRef.current = 1
        if (duration > 0) video.currentTime = duration
        if (onProgress) onProgress(1)
        return
      }

      const playPromise = video.play()
      if (playPromise && typeof playPromise.catch === "function") {
        playPromise
          .then(removeStartListeners)
          .catch((error) => {
            hasStartedPlayback = false
            hasStartedScrolling = false
            console.error("MetroHero playback could not start.", error)
          })
      } else {
        removeStartListeners()
      }
    }

    const onWheel = (e) => {
      if (e.deltaY > 0) {
        e.preventDefault()
        startPlayback()
      }
    }

    const onTouchStart = (e) => {
      touchStartY = e.touches[0] ? e.touches[0].clientY : 0
    }
    const onTouchMove = (e) => {
      const y = e.touches[0] ? e.touches[0].clientY : touchStartY
      const deltaY = touchStartY - y
      touchStartY = y
      if (deltaY > 0) {
        e.preventDefault()
        startPlayback()
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchmove", onTouchMove, { passive: false })
    removeStartListeners = () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchmove", onTouchMove)
    }

    function frame() {
      if (hasStartedPlayback && duration > 0) {
        targetProgress = clamp(video.currentTime / duration, 0, 1)
        if (
          !hasStartedHandoff &&
          handoffLeadTime > 0 &&
          video.currentTime >= duration - handoffLeadTime
        ) {
          hasStartedHandoff = true
          if (onHandoffStart) onHandoffStart()
        }
      }
      currentProgress = targetProgress

      if (hasStartedPlayback && onProgress) {
        const last = lastProgressRef.current ?? -1
        const diff = Math.abs(currentProgress - last)
        if (diff > 0.01 || (currentProgress === 1 && last !== 1)) {
          onProgress(currentProgress)
          lastProgressRef.current = currentProgress
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

    rafId = requestAnimationFrame(frame)

    return () => {
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("timeupdate", onTimeUpdate)
      video.removeEventListener("ended", onEnded)
      removeStartListeners()
      cancelAnimationFrame(rafId)
    }
  }, [handoffLeadTime, onHandoffStart, onProgress])

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
