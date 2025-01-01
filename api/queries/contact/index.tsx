import { apiClient } from "@/api"
import { useQuery } from "react-query"

export async function single() {
  const res = await apiClient.get("/contactData.php")
  return res.data
}

export function useSingle() {
  return useQuery<{ email: string; phone: string; address: string }>(["contact-info"], () => single(), {
    retry: 2,
  })
}
