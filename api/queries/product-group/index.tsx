import { apiClient } from "@/api"
import { ProductCard } from "@/types"

export async function all(lang: string) {
  const res = await apiClient.get<ProductCard[]>("/products.php", {
    params: {
      lang,
    },
  })
  return res.data
}
