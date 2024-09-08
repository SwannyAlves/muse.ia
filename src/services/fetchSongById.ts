import { Song } from "@/types/Song"
import axios, { AxiosRequestConfig } from "axios"

export const fetchSongById = async (id: number): Promise<Song> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: `/songs/${id}`,
  }
  const { data } = await axios(config)
  return data
}
