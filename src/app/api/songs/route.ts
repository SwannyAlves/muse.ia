import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const jsonDirectory = path.join(
      process.cwd(),
      "src",
      "data",
      "server-payload.json"
    )

    const fileContents = await fs.readFile(jsonDirectory, "utf8")

    const data = JSON.parse(fileContents)

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error reading data:", error)
    return NextResponse.json({ message: "Error reading data" }, { status: 500 })
  }
}
