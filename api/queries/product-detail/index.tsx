import { apiClient } from "@/api"
import { Product } from "@/types"

export async function single(lang: string, url: string) {
  const res = await apiClient.get<Product>("/productDetail.php", {
    params: {
      lang,
      url,
    },
  })
  return res.data
}
