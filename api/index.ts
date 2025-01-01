import axios from "axios"

export const apiClient = axios.create({
  baseURL: "https://cms.chillowra.com/services",
})
