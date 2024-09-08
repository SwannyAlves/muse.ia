import { FetchSongsResponse } from "@/types/Songs"
import axios, { AxiosRequestConfig } from "axios"

export const fetchSongs = async (): Promise<FetchSongsResponse> => {
  const config: AxiosRequestConfig = {
    method: "GET",
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    url: "/songs",
  }

  const { data } = await axios(config)
  return data
}
