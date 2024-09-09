import { Header } from "../Header/Header"

export const Error = () => {
  return (
    <>
      <Header />
      <main className="flex items-center flex-col justify-center gap-[41px] py-[41px] px-4 xl:px-0">
        <div className="max-w-[1152px] w-full flex flex-col items-center">
          <h1 className="font-semibold text-[32px] text-white leading-[38.4px]">
            Oops! Something went wrong.
          </h1>
          <p className="font-normal text-[16px] text-[#7f7f7f]">
            We couldn&apos;t load your music library. Please try again later.
          </p>
        </div>
      </main>
    </>
  )
}
