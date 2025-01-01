import { apiClient } from "@/api"
import { Social } from "@/types"
import { useQuery } from "react-query"

export async function all() {
  const res = await apiClient.get("/social-media.php")
  return res.data
}

export function useAll() {
  return useQuery<Social[]>(["social-media"], () => all(), {
    retry: 2,
  })
}
