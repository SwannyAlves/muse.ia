import { fetchSongs } from "@/services/fetchSongs"
import { Songs } from "@/types/Songs"
import { useEffect, useState } from "react"

export const useSongs = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [songs, setSongs] = useState<Songs>()
  const [error, setError] = useState<Error>()

  useEffect(() => {
    fetchSongs()
      .then((data) => setSongs(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, songs, error }
}
