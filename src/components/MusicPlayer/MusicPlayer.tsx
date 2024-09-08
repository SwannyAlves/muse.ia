import Image, { StaticImageData } from "next/image"
import ic_pause from "../../../public/assets/icons/ic-pause.svg"
import ic_play from "../../../public/assets/icons/ic-play.svg"
import { use, useCallback, useEffect, useMemo, useRef, useState } from "react"

interface MusicPlayerProps {
  coverArt: string
  title: string
  artist: string
  album: string
  year: string | number
  favoriteButton: React.ReactNode
  audio: string
}

export const MusicPlayer = ({
  coverArt,
  title,
  artist,
  album,
  year,
  favoriteButton,
  audio,
}: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const togglePlayPause = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }, [isPlaying])

  const handleProgressChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
        const newProgress = Number(e.target.value)
        audioRef.current.currentTime = newProgress
        setProgress(newProgress)
      }
    },
    []
  )

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      const updateProgress = () => setProgress(audio.currentTime)
      const setAudioDuration = () => setDuration(audio.duration)
      audio.addEventListener("timeupdate", updateProgress)
      audio.addEventListener("loadedmetadata", setAudioDuration)
      return () => {
        audio.removeEventListener("timeupdate", updateProgress)
        audio.removeEventListener("loadedmetadata", setAudioDuration)
      }
    }
  }, [])

  const formatProgress = useMemo(() => {
    const minutes = Math?.floor(progress / 60)
    const seconds = Math?.floor(progress % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }, [progress])

  const formattedDuration = useMemo(() => {
    const remaining = duration - progress
    const minutes = Math?.floor(remaining / 60)
    const seconds = Math?.floor(remaining % 60)
    return `-${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }, [duration, progress])

  const PlayPauseIcon = useMemo(() => {
    return isPlaying ? (
      <Image
        src={ic_pause as StaticImageData}
        alt="Pause"
        width={32}
        height={32}
      />
    ) : (
      <Image
        src={ic_play as StaticImageData}
        alt="Play"
        width={32}
        height={32}
      />
    )
  }, [isPlaying])

  return (
    <div className="flex items-center gap-[34px] flex-col md:flex-row">
      <Image
        src={coverArt}
        alt="Album cover"
        width={204}
        height={203}
        className="rounded-[5px] border border-[#5c5f61]"
      />
      <div className="flex-1 flex flex-col gap-[38px]">
        <div className="flex items-center flex-col md:flex-row gap-[38px]">
          <button
            onClick={togglePlayPause}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
          >
            {PlayPauseIcon}
          </button>

          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center gap-[22px]">
              <h3 className="text-left text-white font-semibold text-[32px] leading-[38.4px]">
                {title}
              </h3>
              {favoriteButton}
            </div>

            <div className="text-left text-white font-normal text-base leading-[19.2px] flex gap-3">
              {artist}
              <hr className="w-px h-[18px] bg-white rotate-0 border-0" />
              {album}
              <hr className="w-px h-[18px] bg-white rotate-0 border-0" />
              {year}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start max-w-[414px] w-full gap-2 px-[23px] py-2">
          <div className="relative w-full max-w-[350px] h-[2px] bg-gray-300 rounded-full">
            <input
              type="range"
              min="0"
              max={duration}
              value={progress}
              onChange={handleProgressChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div
              className="absolute top-0 left-0 h-full bg-white rounded-full"
              style={{ width: `${(progress / duration) * 100}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 bg-white rounded-full"
              style={{
                left: `${(progress / duration) * 100}%`,
                width: "12px",
                height: "12px",
              }}
            />
          </div>
          <div className="flex justify-between w-full max-w-[350px] text-sm text-gray-600">
            <span className="text-[14px] font-normal leading-[16.8px] text-left text-[#A8A8A8]">
              {formatProgress}
            </span>
            <span className="text-[14px] font-normal leading-[16.8px] text-left text-[#A8A8A8]">
              {formattedDuration}
            </span>
          </div>
        </div>
      </div>
      <audio ref={audioRef} src={audio} />
    </div>
  )
}
