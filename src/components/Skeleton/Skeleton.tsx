export const Skeleton = () => {
  return (
    <div className="animate-pulse flex flex-col items-center gap-[41px] py-[41px] px-4 xl:px-0">
      <div className="h-8 bg-zinc-900 rounded max-w-[1152px] w-full"></div>
      <div className="max-w-[1152px] w-full flex flex-wrap gap-x-[33px] gap-y-[34px] items-center justify-center xl:justify-start">
        {Array(10)
          .fill("")
          .map((_, index) => (
            <div
              key={index}
              className="w-[200px] h-[300px] bg-zinc-900 rounded"
            ></div>
          ))}
      </div>
    </div>
  )
}
