import { useEffect, useRef } from "react"

type TUseDocumentTitleProps = {
  title: string
  suffix?: string
  remainOnUnmount?: boolean
}
const buildPageName = (pageName: string, suffix: string) =>
  `${pageName} | ${suffix}`

export const useDocumentTitle = (props: TUseDocumentTitleProps): void => {
  const { title, suffix = "Моджи", remainOnUnmount = false } = props
  const previousTitle = useRef<string>(document.title)

  useEffect(() => {
    const previous = previousTitle.current
    document.title = buildPageName(title, suffix)

    return () => {
      if (!remainOnUnmount) {
        document.title = previous
      }
    }
  }, [title, remainOnUnmount, suffix])
}
