import { apiClient } from "@/api"
import { ContactData } from "@/types"
import { useQuery } from "react-query"

export async function single() {
  const res = await apiClient.get("/franchiseData.php")
  return res.data
}

export function useSingle() {
  return useQuery<ContactData>(["franchise-info"], () => single(), {
    retry: 2,
  })
}
