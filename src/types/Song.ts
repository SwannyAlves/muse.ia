import { Songs } from "./Songs"

export interface Song extends Songs {
  related: number[]
}
