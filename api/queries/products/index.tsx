import { apiClient } from "@/api"
import { ProductCard } from "@/types"

export async function all(lang: string, url: string) {
  const res = await apiClient.get<{ parent: string; products: ProductCard[] }>("/products.php", {
    params: {
      lang,
      url,
    },
  })
  return res.data
}
