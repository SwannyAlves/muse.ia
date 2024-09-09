"use client"

import { Header } from "@/components/Header/Header"
import { TextInput } from "@/components/TextInput/TextInput"
import { useFavorites } from "@/context/FavoritesSongsContext"
import { useSongById } from "@/hooks/useSongById"
import { useEffect, useMemo } from "react"
import { FavoriteButton } from "@/components/FavoriteButton/FavoriteButton"
import { MusicPlayer } from "@/components/MusicPlayer/MusicPlayer"
import { useMusicLibrary } from "@/hooks/useMusicLibrary"
import { Card } from "@/components/Card/Card"
import { useRouter } from "next/navigation"
import { Error } from "@/components/Error/Error"
import { Skeleton } from "@/components/Skeleton/Skeleton"

export interface SongProps {
  params: {
    id: string
  }
}

export default function Song({ params }: SongProps) {
  const { favoritesSongs, toggleFavoriteSongs } = useFavorites()
  const router = useRouter()

  const { isLoading, song, error } = useSongById(Number(params.id))

  const {
    songsList,
    suggestsList,
    searchValue,
    handleSearch,
    handleEnterPress,
  } = useMusicLibrary()

  const songDetails = useMemo(() => {
    if (!song) return null
    return {
      title: song?.song?.title,
      artist: song?.song?.artist,
      album: song?.song?.album,
      year: song?.song?.album?.year,
      coverArt: song?.song?.files?.coverArt,
      poster: song?.song?.files?.poster,
      audio: song?.song?.files?.audio,
      id: song?.id,
      relatedAlbums: song?.related,
    }
  }, [song])

  const relatedAlbums = useMemo(() => {
    if (!songsList || !songDetails?.relatedAlbums) return []

    return songsList.filter((song) => {
      return songDetails?.relatedAlbums?.includes(song.id)
    })
  }, [songsList, songDetails?.relatedAlbums])

  if (error) return <Error />
  if (isLoading) return <Skeleton />

  return (
    <>
      <Header>
        <TextInput
          suggestions={suggestsList}
          value={searchValue}
          onChange={handleSearch}
          onSearch={handleEnterPress}
          placeholder="Search in your library"
        />
      </Header>
      <div className="relative h-full bg-[#12303bf5]">
        <div
          className="absolute top-0 right-0 w-1/2 h-5/6 bg-cover bg-no-repeat"
          style={{ backgroundImage: `url(${songDetails?.coverArt})` }}
        />
        <div className="absolute top-0 right-0 w-1/2 h-5/6 bg-[#12303bf5] " />
        <div
          className="relative z-10 flex items-center justify-center pt-[73px] pb-[140px] px-0
        "
        >
          <div className="flex flex-col max-w-[1152px] w-full gap-[94px] items-center justify-center xl:items-start">
            {songDetails && (
              <MusicPlayer
                coverArt={songDetails?.coverArt || ""}
                title={songDetails?.title || ""}
                artist={songDetails?.artist || ""}
                album={songDetails?.album?.title || ""}
                year={songDetails?.album?.year || ""}
                favoriteButton={
                  <FavoriteButton
                    isFavorite={favoritesSongs.includes(
                      songDetails.id as number
                    )}
                    onClick={() =>
                      toggleFavoriteSongs(songDetails?.id as number)
                    }
                  />
                }
                audio={songDetails?.audio || ""}
              />
            )}

            {relatedAlbums.length > 0 && (
              <div className="flex flex-col float-start gap-5 max-w-[1152px] w-full">
                <h3 className="text-white text-base font-medium leading-[19.2px] max-w-[1152px] w-full flex flex-wrap gap-x-[33px] gap-y-[34px] items-center justify-center xl:justify-start">
                  Other albums
                </h3>
                <div className="max-w-[1152px] w-full flex flex-wrap gap-x-[33px] gap-y-[34px] items-center justify-center xl:justify-start">
                  {relatedAlbums?.map((song) => (
                    <Card
                      key={song?.id}
                      title={song?.song?.title}
                      description={song?.song?.artist}
                      image={song?.song?.files?.coverArt}
                      onClick={() => router.push(`/song/${song?.id}`)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
