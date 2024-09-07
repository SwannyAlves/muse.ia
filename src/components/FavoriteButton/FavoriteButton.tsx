import { useMemo } from "react"
import { HeartIcon } from "../HeartIcon/HeartIcon"

interface FavoriteButtonProps {
  label?: string
  isFavorite: boolean
  onClick: () => void
}

export const FavoriteButton = ({
  label,
  isFavorite,
  onClick,
}: FavoriteButtonProps) => {
  const buttonStyles = useMemo(() => {
    if (label) {
      return isFavorite
        ? "bg-[#404040] text-white hover:bg-none  px-6 py-2 "
        : "bg-[#262626] text-white hover:bg-[#333333]  px-6 py-2 "
    }
    return "text-white"
  }, [isFavorite, label])

  const iconFill = useMemo(
    () => (isFavorite ? "#F8594E" : "none"),
    [isFavorite]
  )
  const iconStroke = useMemo(
    () => (isFavorite ? "#F8594E" : "white"),
    [isFavorite]
  )

  return (
    <button
      className={`flex items-center gap-2 rounded-full ${buttonStyles} transition-colors duration-100`}
      onClick={onClick}
    >
      <HeartIcon fill={iconFill} stroke={iconStroke} />
      {label && <span className="font-[600] text-[14px] ">{label}</span>}
    </button>
  )
}
