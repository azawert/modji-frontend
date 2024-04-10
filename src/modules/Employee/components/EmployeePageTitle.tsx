import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { Typography } from "@mui/material"

/**
 * @prop title тайтл для отображения хедера страницы
 * @prop onClick обработчик для клика по кнопке в хедере
 */
type TProps = {
  title: string
  onClick: () => void
}

export const EmployeePageTitle: React.FC<TProps> = props => {
  const { onClick, title } = props
  return (
    <div className="flex justify-between items-center font-body mt-6 mb-5">
      <Typography fontSize={36} fontWeight={800} className="font-body">
        {title}
      </Typography>
      <Button
        variant={EButtonVariant.Primary}
        size={EButtonSize.Small}
        leftIcon={"PlusIcon"}
        onClick={onClick}
        fontWeight={700}
      >
        Добавить сотрудника
      </Button>
    </div>
  )
}
