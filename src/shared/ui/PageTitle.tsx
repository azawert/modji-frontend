import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { Typography } from "@mui/material"
import { memo } from "react"

/** Пропс для заголовка отдельной страницы
 * @prop title тайтл для отображения хедера страницы
 * @prop buttonText текст для кнопки
 * @prop onClick обработчик для клика по кнопке в хедере
 */
type TProps = {
  title: string
  buttonText?: string
  onClick?: () => void
}

export const PageTitle: React.FC<TProps> = memo(props => {
  const { onClick, title, buttonText } = props
  return (
    <div className="flex justify-between items-center font-body mt-6 mb-5">
      <Typography fontSize={36} fontWeight={800} className="font-body">
        {title}
      </Typography>
      {buttonText && (
        <Button
          variant={EButtonVariant.Primary}
          size={EButtonSize.Small}
          leftIcon={"PlusIcon"}
          onClick={onClick}
          fontWeight={700}
        >
          {buttonText}
        </Button>
      )}
    </div>
  )
})
