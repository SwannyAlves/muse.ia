import { useCallback, useMemo, useState } from "react"
import { useSongs } from "./useSongs"
import { useFavorites } from "@/context/FavoritesSongsContext"
import { useRouter } from "next/navigation"

export const useMusicLibrary = () => {
  const router = useRouter()
  const { songs, isLoading, error } = useSongs()
  const { favoritesSongs } = useFavorites()
  const [seeFavoriteSongs, setSeeFavoriteSongs] = useState(false)
  const [changeOrder, setChangeOrder] = useState(false)
  const [searchValue, setSearchValue] = useState("")

  const songsList = useMemo(() => {
    if (!songs || !songs.songs) return []
    if (seeFavoriteSongs) {
      return songs.songs.filter((songs) => favoritesSongs.includes(songs.id))
    }
    if (changeOrder) {
      const sortedSongs = [...songs.songs]
      return sortedSongs.sort((a, b) => {
        if (a.song.title > b.song.title) {
          return 1
        }
        if (a.song.title < b.song.title) {
          return -1
        }
        return 0
      })
    }
    return songs.songs
  }, [songs, seeFavoriteSongs, favoritesSongs, changeOrder])

  const suggestsList = useMemo(() => {
    if (!songs || !songs.songs) return []
    return songs.songs.map((song) => song.song.title)
  }, [songs])

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value)
  }, [])

  const handleEnterPress = useCallback(
    (value: string) => {
      const songSelected = songsList.find((song) => {
        return song.song.title === value || song.song.artist === value
      })
      if (songSelected) {
        router.push(`/song/${songSelected.id}`)
      } else {
        router.push(`/song/${value}`)
      }
    },
    [songsList, router]
  )

  const handleOrder = useCallback(() => {
    setChangeOrder((prevState) => !prevState)
  }, [])

  return {
    isLoading,
    error,
    songsList,
    suggestsList,
    searchValue,
    seeFavoriteSongs,
    changeOrder,
    handleSearch,
    handleEnterPress,
    handleOrder,
    favoritesSongs,
    setSeeFavoriteSongs,
  }
}
