import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "MUSE.is",
  description: "MUSE.is - A blog about music.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={"bg-zinc-900 text-zinc-200"}>{children}</body>
    </html>
  )
}
