import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const jsonDirectory = path.join(
      process.cwd(),
      "src",
      "data",
      "server-payload.json"
    )

    const fileContents = await fs.readFile(jsonDirectory, "utf8")

    const data = JSON.parse(fileContents)

    const songId = Number(params.id)

    const song = data.songs.find((song: any) => song.id === songId)

    if (!song) {
      return NextResponse.json({ message: "Song not found" }, { status: 404 })
    }

    return NextResponse.json(song)
  } catch (error) {
    console.error("Error reading data:", error)
    return NextResponse.json({ message: "Error reading data" }, { status: 500 })
  }
}
