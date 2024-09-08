"use client"

import { Card } from "@/components/Card/Card"
import { FavoriteButton } from "@/components/FavoriteButton/FavoriteButton"
import { Header } from "@/components/Header/Header"
import { TextInput } from "@/components/TextInput/TextInput"
import { Toggle } from "@/components/Toggle/Toggle"
import { useFavorites } from "@/context/FavoritesSongsContext"
import { useMusicLibrary } from "@/hooks/useMusicLibrary "
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

export default function Home() {
  const router = useRouter()
  const { favoritesSongs, toggleFavoriteSongs } = useFavorites()

  const {
    songsList,
    suggestsList,
    seeFavoriteSongs,
    changeOrder,
    searchValue,
    handleSearch,
    handleEnterPress,
    handleOrder,
    setSeeFavoriteSongs,
  } = useMusicLibrary()

  const handleSeeFavorite = useCallback(() => {
    setSeeFavoriteSongs((prevState) => !prevState)
  }, [setSeeFavoriteSongs])

  const handleFavoriteClick = (id: number) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation()
      toggleFavoriteSongs(id)
    }
  }

  return (
    <>
      <Header />
      <main className="flex items-center flex-col justify-center gap-[41px] py-[41px] px-4 xl:px-0 ">
        <div className="max-w-[1152px] w-full flex flex-col md:flex-row">
          <div className="flex flex-col gap-[11px] max-w-[379px] w-full items-start">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <h1 className="font-semibold text-[32px] text-white leading-[38.4px]">
                Your Library
              </h1>
              <FavoriteButton
                label="Favorites"
                onClick={handleSeeFavorite}
                isFavorite={seeFavoriteSongs}
              />
            </div>
            <p className="font-normal text-[16px] text-[#7f7f7f]">
              You have {songsList.length} songs in your library
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 justify-end w-full mt-4 md:mt-0 md:flex-row md:justify-start">
            <Toggle
              isActive={changeOrder}
              onToggle={handleOrder}
              label="Sort from A-Z"
            />
            <div className="w-full max-w-[254px]">
              <TextInput
                suggestions={suggestsList}
                value={searchValue}
                onChange={handleSearch}
                onSearch={handleEnterPress}
                placeholder="Search in your library"
              />
            </div>
          </div>
        </div>
        <div className="max-w-[1152px] w-full flex flex-wrap gap-x-[33px] gap-y-[34px] items-center justify-center xl:justify-start">
          {songsList.map((song) => (
            <Card
              key={song.id}
              title={song.song.title}
              description={song.song.artist}
              image={song.song.files.coverArt}
              FavoriteButton={
                <FavoriteButton
                  isFavorite={favoritesSongs.includes(song.id)}
                  onClick={handleFavoriteClick(song.id)}
                />
              }
              onClick={() => router.push(`/song/${song.id}`)}
            />
          ))}
        </div>
      </main>
    </>
  )
}
