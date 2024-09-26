import { RefObject, useEffect, useRef, useState } from "react"

/**
 * Хук для получения значения с задержкой
 * @param value значение которое нужно получить с задержкой
 * @param delay задержка
 * @returns значение с задержкой
 * @example
 * const [text, setText] = useState<string>('')
 * const debouncedValue = useDebounce(value, 500)
 *
 * useEffect(() => fetchCall(url, {debouncedValue}), [debouncedValue])
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [value, delay])

  return debouncedValue
}

/**
 * Хук для обработки кликов за пределами указанного элемента
 * @param cb колбек который нужно выполнить, если кликнули за пределы элемента
 * @returns ref возвращает ссылку на элемент, который нужно отслеживать
 * @example
 * const ExampleComponent: React.FC = () => {
 *   const [isOpen, setIsOpen] = useState(false);
 *   const ref = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
 *
 *   return (
 *     <div>
 *       <button onClick={() => setIsOpen(true)}>Open Menu</button>
 *       {isOpen && (
 *         <div ref={ref}>
 *           <p>Click outside to close this menu.</p>
 *         </div>
 *       )}
 *     </div>
 *   );
 * };
 */
export const useClickOutside = <T extends HTMLElement>(
  cb: () => void
): RefObject<T> => {
  const ref = useRef<T>(null)

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      if (ref.current && !ref.current.contains(evt.target as Node)) {
        cb()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [cb])

  return ref
}
