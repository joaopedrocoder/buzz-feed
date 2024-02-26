import { Option } from "./option.model"

export type Question = {
  id: number
  title: string
  question: string
  options: Option[]
}