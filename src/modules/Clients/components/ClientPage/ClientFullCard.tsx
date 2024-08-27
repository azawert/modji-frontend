import { IInfoItem, IPropsForClientFullCard } from "@/modules/Clients/types.ts"
import { FullCard } from "@/shared/ui/FullCard.tsx"
import { useCallback } from "react"
import { Box } from "@mui/material"
import { getFullName } from "@/modules/Employee/utils.ts"
import { InfoCard } from "@/shared/ui/InfoCard.tsx"
import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button.tsx"
import styled from "@emotion/styled"
import { formatDate } from "@/widgets/DatePicker/utils.ts"
import dayjs from "dayjs"
import { Gap } from "@/shared/ui/Gap.tsx"

export const SectionHeader = styled(Box)`
  background-color: #d5e1ff;
  font-weight: bold;
  padding: 8px 8px 8px 24px;
  border-radius: 8px 8px 0 0;
`

export const ClientFullCard = ({
  clientInfo,
  handleEditClientNavigate,
}: IPropsForClientFullCard) => {
  if (!clientInfo) return null

  const {
    mainPhone,
    secondaryPhone,
    confidant,
    firstName,
    lastName,
    middleName,
    registrationDate,
    additionalComment,
    fromWhere,
    realAddress,
    otherContacts,
    rating,
  } = clientInfo

  const prepareClientInfoData = (): IInfoItem[] => [
    {
      title: "ФИО",
      value: getFullName(firstName, lastName, middleName) + ` ★ ${rating}`,
    },
    {
      title: "Основной телефон",
      value: mainPhone,
    },
    {
      title: "Второй телефон",
      value: secondaryPhone,
    },
    {
      title: "Прочие контакты",
      value: otherContacts,
    },
    {
      title: "Фактический адрес",
      value: realAddress,
    },
    { title: "Доверенное лицо", value: confidant },
    { title: "Откуда узнал о гостинице", value: fromWhere },
    {
      title: "Дата регистрации",
      value: formatDate(dayjs(registrationDate)),
    },
    { title: "Комментарий", value: additionalComment },
  ]

  const renderHeader = useCallback(() => {
    return <SectionHeader component="div">Личные данные</SectionHeader>
  }, [])

  const renderMainContent = useCallback(() => {
    return (
      <div
        style={{
          display: "flex",
          gap: "135px",
          padding: "24px 32px",
          justifyContent: "space-between",
        }}
      >
        <div>
          {prepareClientInfoData()
            .slice(0, 4)
            .map((el, idx) => (
              <>
                <Box key={el.title}>
                  <InfoCard.Title>{el.title}</InfoCard.Title>
                  <InfoCard.Value>{el.value}</InfoCard.Value>
                </Box>
                {idx !== 3 && <Gap gap={20} />}
              </>
            ))}
        </div>
        <div>
          {prepareClientInfoData()
            .slice(4)
            .map((el, idx) => (
              <>
                <Box key={el.title}>
                  <InfoCard.Title>{el.title}</InfoCard.Title>
                  <InfoCard.Value>{el.value}</InfoCard.Value>
                </Box>
                {idx !== prepareClientInfoData().length - 1 && <Gap gap={20} />}
              </>
            ))}
        </div>
        <div>
          <Button
            size={EButtonSize.Small}
            variant={EButtonVariant.Secondary}
            onClick={handleEditClientNavigate}
          >
            Редактировать
          </Button>
        </div>
      </div>
    )
  }, [additionalComment, handleEditClientNavigate])

  return (
    <FullCard
      renderHeader={renderHeader}
      renderMainContent={renderMainContent}
    />
  )
}
