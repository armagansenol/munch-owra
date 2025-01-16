import { z } from "zod"
import { useMutation } from "react-query"
import { apiClient } from "@/api"

export const FormSchema = z
  .object({
    name: z.string().min(1, {
      message: "Ad soyad bilgisi giriniz.",
    }),
    email: z.string().email({
      message: "Geçerli bir e-posta adresi giriniz.",
    }),
    phone: z.string().min(1, {
      message: "Geçerli bir telefon numarası giriniz.",
    }),
    message: z.string().min(1, {
      message: "Mesaj bilgisi giriniz.",
    }),
    kvkk: z.boolean(),
    formType: z.string(),
  })
  .superRefine((data, ctx) => {
    if (!data.kvkk) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "KVKK Onayı gereklidir",
        path: ["kvkk"],
      })
    }
  })

type FormData = z.infer<typeof FormSchema>

async function submitForm(values: FormData) {
  const formData = new FormData()

  Object.entries(values).forEach(([key, value]) => {
    formData.append(`${key}`, value.toString())
  })

  const res = await apiClient.post<{ success: boolean; message: string }>("/contact.php", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return res.data
}

export function useSubmitForm() {
  return useMutation(submitForm, {
    retry: 2,
  })
}
