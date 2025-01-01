import { apiClient } from "@/api"
import { CardBlogProps } from "@/types"
import { useQuery } from "react-query"

interface BlogPostProps {
  nextblogs: CardBlogProps[]
  blog: CardBlogProps
}

export async function single(url: string) {
  const res = await apiClient.get<BlogPostProps>("/blogDetail.php", {
    params: {
      url,
    },
  })

  return res.data
}

export async function all() {
  const res = await apiClient.get("/blogs.php")
  return res.data
}

interface BlogPage {
  latestBlog: CardBlogProps[]
  blogs: CardBlogProps[]
}

export function useAll() {
  return useQuery<BlogPage>(["blog-posts"], () => all(), {
    retry: 2,
  })
}
