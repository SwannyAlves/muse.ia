import React, { useCallback, useMemo, useState } from "react"
import Image from "next/image"
import ic_search from "../../../public/assets/icons/ic-search.svg"

interface TextInputProps {
  onSearch?: (value: string) => void
  placeholder?: string
  suggestions: string[]
  value: string
  onChange: (value: string) => void
}

export const TextInput = ({
  onSearch,
  placeholder,
  suggestions,
  value,
  onChange,
}: TextInputProps) => {
  const [showSuggestions, setShowSuggestions] = useState(false)

  const filterSuggestions = useMemo(() => {
    if (!value) return []
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(value.toLowerCase())
    )
  }, [value, suggestions])

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      onChange(newValue)
      onSearch?.(newValue)
      setShowSuggestions(true)
    },
    [onChange, onSearch]
  )

  const handleOnSelectSuggestion = useCallback(
    (suggestion: string) => {
      onChange(suggestion)
      setShowSuggestions(false)
      if (onSearch) onSearch(suggestion)
    },
    [onChange, onSearch]
  )

  const handleOnBlur = useCallback(() => {
    setShowSuggestions(false)
  }, [])

  const handleOnFocus = useCallback(() => {
    setShowSuggestions(true)
  }, [])

  return (
    <div className="relative w-full">
      <div className="flex items-center max-w-[359px] w-full gap-2 p-2 rounded-lg bg-[#262626] focus-within:bg-[#404040] transition-colors duration-300">
        <Image src={ic_search} alt="Search Icon" width={20} height={20} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          className="w-full text-white text-base font-[500] bg-[#262626] focus:bg-[#404040] transition-colors duration-300 outline-none placeholder:text-white"
        />
      </div>

      {showSuggestions && filterSuggestions.length > 0 && (
        <ul className="absolute max-w-[359px] w-full bg-[#2D2D2D] rounded-[5px] border-none p-[14px] mt-[6px] z-10">
          {filterSuggestions.map((suggestion, index) => (
            <li
              className="cursor-pointer text-start"
              key={index}
              onMouseDown={() => handleOnSelectSuggestion(suggestion)}
            >
              {suggestion}
              {index !== filterSuggestions.length - 1 && (
                <hr className="my-[14px]  border border-[#545454]" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
