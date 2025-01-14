import s from "./form-contact.module.scss"

import { zodResolver } from "@hookform/resolvers/zod"
import cx from "clsx"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { FormSchema, useSubmitForm } from "@/api/mutations/contact-form"
import { Checkbox } from "@/components/utility/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/utility/form"
import { Input } from "@/components/utility/input"
import { LoadingSpinner } from "@/components/utility/loading-spinner"
import { Textarea } from "@/components/utility/textarea"
import { FormType } from "@/types"

export interface FormContactProps {
  theme?: "blue" | "white"
  formType: FormType
}

export default function FormContact(props: FormContactProps) {
  const { theme = "blue", formType } = props
  const t = useTranslations("formContact")
  const [responseMessage, setResponseMessage] = useState("")

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      kvkk: false,
      formType,
    },
  })

  const { mutate, isLoading, data: responseData } = useSubmitForm()

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutate(data)
  }

  useEffect(() => {
    if (!responseData?.message) return
    setResponseMessage(responseData?.message)
    form.reset()
  }, [responseData, form])

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (responseMessage) {
      timeout = setTimeout(() => setResponseMessage(""), 10000)
    }

    return () => clearTimeout(timeout)
  }, [responseMessage])

  return (
    <div className={cx(s.formContact, [s[theme]])}>
      <div className="flex-1">
        <Form {...form}>
          <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
            <div
              className={cx(s.fieldC, {
                [s.error]: form.formState.errors.name,
              })}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className={s.formItem}>
                    <FormControl>
                      <Input className={cx(s.input, s.border)} placeholder={t("fields.name.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage className={s.formMessage} />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cx(s.fieldC, {
                [s.error]: form.formState.errors.email,
              })}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className={s.formItem}>
                    <FormControl>
                      <Input className={cx(s.input, s.border)} placeholder={t("fields.email.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage className={s.formMessage} />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cx(s.fieldC, {
                [s.error]: form.formState.errors.phone,
              })}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className={s.formItem}>
                    <FormControl>
                      <Input className={cx(s.input, s.border)} placeholder={t("fields.phone.placeholder")} {...field} />
                    </FormControl>
                    <FormMessage className={s.formMessage} />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cx(s.fieldC, {
                [s.error]: form.formState.errors.message,
              })}
            >
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className={s.formItem}>
                    <FormControl>
                      <Textarea
                        className={cx(s.input, s.textarea, s.border)}
                        placeholder={t("fields.message.placeholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className={s.formMessage} />
                  </FormItem>
                )}
              />
            </div>
            <div
              className={cx(s.fieldC, {
                [s.error]: form.formState.errors.kvkk,
              })}
            >
              <FormField
                control={form.control}
                name="kvkk"
                render={({ field }) => (
                  <FormItem className={s.formItem}>
                    <div className="flex flex-row items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className={s.formLabel}>{t("consent")}</FormLabel>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <button className={s.submitBtn} type="submit" disabled={!form.formState.isValid}>
              {isLoading ? (
                <div className={cx(s.spinnerC, "pointer-events-none")}>
                  <LoadingSpinner />
                </div>
              ) : (
                <span className="pointer-events-none">{t("button.text")}</span>
              )}
            </button>
          </form>
        </Form>
        {responseMessage && <div className={s.response}>{responseMessage}</div>}
      </div>
    </div>
  )
}
