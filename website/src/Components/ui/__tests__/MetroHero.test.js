import { act, fireEvent, render } from "@testing-library/react"
import MetroHero from "../MetroHero"

describe("MetroHero ambient video", () => {
  let animationFrames

  beforeEach(() => {
    animationFrames = []
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      animationFrames.push(callback)
      return animationFrames.length
    })
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {})
    jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve())
    jest.spyOn(HTMLMediaElement.prototype, "pause").mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("loops the opening segment while idle", () => {
    const onProgress = jest.fn()
    const { container } = render(<MetroHero onProgress={onProgress} />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    expect(video.play).toHaveBeenCalledTimes(1)

    const firstFrame = animationFrames.shift()
    act(() => firstFrame(16))
    expect(onProgress).not.toHaveBeenCalled()

    video.currentTime = 1.1
    fireEvent.timeUpdate(video)
    expect(video.currentTime).toBe(0)
  })

  it("freezes the ambient playback and scrubs forward from that frame", () => {
    const { container } = render(<MetroHero />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    video.currentTime = 1.25
    fireEvent.wheel(window, { deltaY: 320 })

    expect(video.pause).toHaveBeenCalledTimes(1)

    const firstFrame = animationFrames.shift()
    act(() => firstFrame(16))
    expect(video.currentTime).toBeGreaterThan(1.25)
  })

  it("ignores scroll input when inactive during a handoff", () => {
    const onProgress = jest.fn()
    const { container } = render(<MetroHero interactive={false} onProgress={onProgress} />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    fireEvent.wheel(window, { deltaY: 320 })

    const firstFrame = animationFrames.shift()
    act(() => firstFrame(16))
    expect(video.pause).not.toHaveBeenCalled()
    expect(onProgress).not.toHaveBeenCalled()
  })
})
