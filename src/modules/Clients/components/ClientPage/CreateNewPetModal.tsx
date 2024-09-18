import { Box, Dialog, DialogTitle, IconButton, Typography } from "@mui/material"
import { Close } from "@mui/icons-material"
import { Gap } from "@/shared/ui/Gap.tsx"
import { LabeledRow } from "@/shared/ui/LabeledRow.tsx"
import { Select } from "@/shared/ui/Select.tsx"
import { useCallback } from "react"
import { NEW_PET_SELECT_DATA } from "@/modules/Clients/const.ts"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button.tsx"
import { PetDtoType } from "@/generated/pets.ts"

/** Пропсы для модалки перехода на страницу создания питомца
 * {boolean} isOpen флаг открытия модалки
 * {() => void} onClose колбек закрытия модалки
 * {() => void} onSuccess колбек успешного исхода
 * {string} clientName имя клиента
 * {string} rating рейтинг
 * {(val:string) => void} onPetChange обработчик изменения
 * */
type TProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  clientName: string
  value?: PetDtoType
  rating: number
  onPetChange: (val: string) => void
  error?: string
}

/** Тип для мапера текстовки с бэкенда */
type TMapperPetTypeToLabel = Record<PetDtoType, string>

const mapperPetTypeDtoToFormLabel: TMapperPetTypeToLabel = {
  CAT: "Кот",
  DOG: "Собака",
  EXOTIC: "Прочие",
}

export const CreateNewPetModal = ({
  onSuccess,
  onClose,
  isOpen,
  clientName,
  rating,
  onPetChange,
  error,
  value,
}: TProps) => {
  const renderHeader = () => (
    <IconButton onClick={onClose}>
      <Close />
    </IconButton>
  )
  const renderValue = useCallback(
    (value: string) =>
      value?.length ? (
        mapperPetTypeDtoToFormLabel[value as PetDtoType]
      ) : (
        <Typography color="#757575">Выберите тип животного</Typography>
      ),
    []
  )

  const renderBody = () => (
    <>
      <Typography fontSize={24} fontWeight={800} mb="16px">
        Новый питомец
      </Typography>
      <Gap gap={16} />
      <LabeledRow label={"ФИО  клиента"}>
        {clientName + " ★" + rating}
      </LabeledRow>
      <Gap gap={24} />
      <Typography fontWeight={700} fontSize={20}>
        Тип животного
      </Typography>
      <Select
        renderValue={renderValue}
        data={NEW_PET_SELECT_DATA}
        onChange={onPetChange}
        fullWidth
        error={error}
        selectedValue={value || ""}
      />
      <Gap gap={32} />
    </>
  )

  const renderFooter = () => (
    <>
      <Button
        size={EButtonSize.Large}
        variant={EButtonVariant.Secondary}
        onClick={onClose}
        fontSize={16}
        fontWeight={700}
      >
        Отменить
      </Button>
      <Button
        size={EButtonSize.Large}
        variant={EButtonVariant.Primary}
        fontSize={16}
        fontWeight={700}
        onClick={onSuccess}
      >
        Далее
      </Button>
    </>
  )
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby={"createNewPetModalHeader"}
      aria-describedby={"createNewPetModalBody"}
      sx={{
        "& .MuiDialogTitle-root": {
          padding: 0,
        },
        "& .MuiPaper-root": {
          borderRadius: "16px",
          width: "616px",
        },
      }}
    >
      <DialogTitle display="flex" justifyContent="flex-end">
        {renderHeader()}
      </DialogTitle>
      <div className="pb-10 px-16">
        {renderBody()}
        <Box display={"flex"} justifyContent={"space-between"}>
          {renderFooter()}
        </Box>
      </div>
    </Dialog>
  )
}
