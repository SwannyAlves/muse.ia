import { useMemo } from "react"

interface ToggleProps {
  label?: string
  isActive: boolean
  onToggle: () => void
}

export const Toggle = ({ label, isActive, onToggle }: ToggleProps) => {
  const toggleClasses = useMemo(
    () =>
      `relative inline-flex items-center h-[32px] w-[58px] rounded-full transition-colors duration-300 ${
        isActive ? "bg-[#00DAE8]" : "bg-[#404040]"
      }`,
    [isActive]
  )

  const circleClasses = useMemo(
    () =>
      `inline-block w-[28px] h-[28px] transform bg-white rounded-full transition-transform duration-300 shadow-md ${
        isActive ? "translate-x-[28px]" : "translate-x-[2px]"
      }`,
    [isActive]
  )

  return (
    <div className="flex items-center gap-[11px]">
      {label && <span className="font-[600] text-[14px]">{label}</span>}
      <button type="button" className={toggleClasses} onClick={onToggle}>
        <span className={circleClasses} />
      </button>
    </div>
  )
}
