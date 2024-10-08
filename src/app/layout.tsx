import type { Metadata } from "next"
import "./globals.css"
import { FavoritesProvider } from "@/context/FavoritesSongsContext"
import localFont from "next/font/local"
import { Header } from "@/components/Header/Header"

const articulat = localFont({
  src: [
    {
      path: "../../public/assets/fonts/ArticulatCF-Medium.otf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../../public/assets/fonts/ArticulatCF-Normal.otf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-articular",
})

export const metadata: Metadata = {
  title: "MUSE.ai",
  description: "MUSE.ai - A blog about music.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${articulat.className} bg-[#0C0C0C] `}>
        <FavoritesProvider>{children}</FavoritesProvider>
      </body>
    </html>
  )
}
