import { act, fireEvent, render } from "@testing-library/react"
import CameraVideo from "../CameraVideo"

describe("CameraVideo autoplay", () => {
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

  it("plays through to the zoom reveal without scroll input", () => {
    const onProgress = jest.fn()
    const onReveal = jest.fn()
    const { container } = render(
      <CameraVideo onProgress={onProgress} onReveal={onReveal} />
    )
    const video = container.querySelector("video")
    Object.defineProperty(video, "duration", { configurable: true, value: 10 })

    fireEvent.loadedData(video)
    expect(video.play).toHaveBeenCalledTimes(1)

    video.currentTime = 10
    fireEvent.timeUpdate(video)
    fireEvent.ended(video)

    act(() => {
      for (let index = 0; index < 120; index += 1) {
        const frame = animationFrames.shift()
        frame((index + 1) * 16)
      }
    })

    expect(onProgress).toHaveBeenLastCalledWith(1)
    expect(onReveal).toHaveBeenCalledWith(true)
  })
})
