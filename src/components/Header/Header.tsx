import React, { useMemo } from "react"

interface HeaderProps {
  children?: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  const containerClassName = useMemo(() => {
    return `flex flex-col md:flex-row md:justify-start items-start md:items-center max-w-[1152px] w-full ${
      children ? "gap-[20px] md:gap-[54px]" : ""
    }`
  }, [children])

  return (
    <header className="flex items-center justify-center bg-[#1D1D1D] py-[22px] px-4 xl:px-0">
      <div className={containerClassName}>
        <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#00F2D5] to-[#AD00FF]">
          MUSE.ai
        </h1>
        {children && (
          <div className="text-left md:text-center md:mt-0 w-full">
            {children}
          </div>
        )}
      </div>
    </header>
  )
}
