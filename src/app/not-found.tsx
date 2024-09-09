"use client"

export default function Custom404() {
  return (
    <main className="flex items-center flex-col justify-center gap-[41px] py-[41px] px-4 xl:px-0">
      <div className="max-w-[1152px] w-full flex flex-col items-center">
        <h1 className="font-semibold text-[32px] text-white leading-[38.4px]">
          Oops! Page not found.
        </h1>
        <p className="font-normal text-[16px] text-[#7f7f7f]">
          <a className="text-[#7f7f7f] hover:cursor-pointer" href="/">
            Go back to the home page
          </a>
        </p>
      </div>
    </main>
  )
}
