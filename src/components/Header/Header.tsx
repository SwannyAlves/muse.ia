interface HeaderProps {
  children?: React.ReactNode
}

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className="flex items-center justify-center bg-[#1D1D1D] py-[22px]">
      <div className="flex flex-col md:flex-row md:justify-start items-start md:items-center max-w-[1152px] w-full gap-[20px] md:gap-[54px]">
        <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-b from-[#00F2D5] to-[#AD00FF]">
          MUSE.ai
        </h1>
        <div className="text-left md:text-center md:mt-0 w-full md:w-auto">
          {children}
        </div>
      </div>
    </header>
  )
}
