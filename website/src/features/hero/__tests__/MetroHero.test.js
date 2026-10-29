import { act, fireEvent, render } from "@testing-library/react"
import MetroHero from "../MetroHero"

describe("MetroHero one-gesture playback", () => {
  let animationFrames

  beforeEach(() => {
    animationFrames = []
    jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
      animationFrames.push(callback)
      return animationFrames.length
    })
    jest.spyOn(window, "cancelAnimationFrame").mockImplementation(() => {})
    jest.spyOn(HTMLMediaElement.prototype, "play").mockImplementation(() => Promise.resolve())
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("stays paused until a downward scroll starts playback", () => {
    const { container } = render(<MetroHero />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    expect(video.play).not.toHaveBeenCalled()

    fireEvent.wheel(window, { deltaY: 120 })
    expect(video.play).toHaveBeenCalledTimes(1)
  })

  it("reports forward playback progress through the video end", () => {
    const onProgress = jest.fn()
    const { container } = render(<MetroHero onProgress={onProgress} />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    fireEvent.wheel(window, { deltaY: 120 })

    video.currentTime = 5
    fireEvent.timeUpdate(video)
    const progressFrame = animationFrames.shift()
    act(() => progressFrame(16))
    expect(onProgress).toHaveBeenCalledWith(0.5)

    video.currentTime = 10
    fireEvent.ended(video)
    const endFrame = animationFrames.shift()
    act(() => endFrame(32))
    expect(onProgress).toHaveBeenLastCalledWith(1)
  })

  it("does not respond to reverse scroll after playback starts", () => {
    const { container } = render(<MetroHero />)
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    fireEvent.wheel(window, { deltaY: 120 })
    video.currentTime = 3
    fireEvent.timeUpdate(video)
    fireEvent.wheel(window, { deltaY: -120 })

    expect(video.currentTime).toBe(3)
    expect(video.play).toHaveBeenCalledTimes(1)
  })

  it("starts the handoff at the configured lead time before the video ends", () => {
    const onHandoffStart = jest.fn()
    const { container } = render(
      <MetroHero handoffLeadTime={1.5} onHandoffStart={onHandoffStart} />
    )
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    fireEvent.wheel(window, { deltaY: 120 })

    video.currentTime = 8.4
    act(() => animationFrames.shift()(16))
    expect(onHandoffStart).not.toHaveBeenCalled()

    video.currentTime = 8.5
    act(() => animationFrames.shift()(32))
    expect(onHandoffStart).toHaveBeenCalledTimes(1)
  })
})
