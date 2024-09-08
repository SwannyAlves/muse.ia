"use client"

import { createContext, useState, useContext, ReactNode } from "react"

interface FavoritesSongsContextType {
  favoritesSongs: number[]
  toggleFavoriteSongs: (id: number) => void
}

const FavoritesSongsContext = createContext<
  FavoritesSongsContextType | undefined
>(undefined)

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favoritesSongs, setFavoritesSongs] = useState<number[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("favoritesSongs")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  const toggleFavoriteSongs = (id: number) => {
    setFavoritesSongs((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id]
      localStorage.setItem("favoritesSongs", JSON.stringify(updated))
      return updated
    })
  }

  return (
    <FavoritesSongsContext.Provider
      value={{ favoritesSongs, toggleFavoriteSongs }}
    >
      {children}
    </FavoritesSongsContext.Provider>
  )
}

export const useFavorites = () => {
  const context = useContext(FavoritesSongsContext)
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider")
  }
  return context
}
