import { useEffect, useRef } from "react"
import { useEventCallback } from "@mui/material"

export function useClickOutside<T extends HTMLElement>(
  cb: (e?: Event) => void,
  allowedSelectors?: string[]
): React.MutableRefObject<T | null> {
  const ref = useRef<T | null>(null)
  const refCb = useEventCallback(cb)
  const refSelectors = useRef<string[]>(allowedSelectors || [])

  useEffect(() => {
    const handler = (e: Event) => {
      const element = ref.current

      if (!element || element.contains(e.target as HTMLElement)) {
        return
      }

      if (Array.isArray(refSelectors.current)) {
        for (let i = 0; i < refSelectors.current.length; i += 1) {
          if ((e.target as HTMLElement)?.closest(refSelectors.current[i])) {
            return
          }
        }
      }

      if (typeof refCb === "function") refCb(e)
    }

    document.addEventListener("mousedown", handler)
    document.addEventListener("touchstart", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
      document.removeEventListener("touchstart", handler)
    }
  }, [refCb])

  return ref
}
