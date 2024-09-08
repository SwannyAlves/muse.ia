import { fetchSongById } from "@/services/fetchSongById"
import { Song } from "@/types/Song"
import { useEffect, useState } from "react"

export const useSongById = (id: number) => {
  const [isLoading, setIsLoading] = useState(true)
  const [song, setSong] = useState<Song>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetchSongById(id)
      .then((data) => setSong(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [id])

  return { isLoading, song, error }
}
