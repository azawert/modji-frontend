import { FC } from "react"

import { Box, Chip, Paper, Typography } from "@mui/material"

import { mapperForValuePetTypeToAnLabel } from "@/modules/Clients/utils"

import { StarIcon } from "@/assets/Icons/StarIcon"
import { PetDto, PetDtoType } from "@/generated/bookings.ts"

type TProps = {
  labelStatus: string
  clientName: string
  clientRating: string
  pet?: PetDto
  checkInDate: string
  checkOutDate: string
  bookingSum: string
  color: "#A2E9FF" | "#FEE97E" | "#6EE38F" | "#EBAAFB" | undefined
}

export const BookingTooltipCard: FC<TProps> = props => {
  const {
    clientName,
    color,
    bookingSum,
    checkInDate,
    checkOutDate,
    clientRating,
    labelStatus,
    pet,
  } = props

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        maxWidth: 360, // ⬅ ширина тултипа
      }}
    >
      <Chip
        label={labelStatus}
        size="small"
        sx={{
          backgroundColor: "#F5F5F5",
          color: "#000",
          fontWeight: 500,
          mb: 1,
          "& .MuiChip-icon": {
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: color,
          },
        }}
        icon={<Box component="span" />}
      />
      <Typography fontSize={12} color="text.secondary">
        ФИО
      </Typography>
      <Typography
        fontSize={16}
        fontWeight={600}
        display="flex"
        alignItems="center"
        flexWrap="wrap"
      >
        {clientName}
        {clientRating && (
          <Box ml={1} display="flex" alignItems="center">
            <StarIcon fontSize="small" color="warning" /> {clientRating}
          </Box>
        )}
      </Typography>

      <Box display="flex" justifyContent="space-between" mt={1} gap={2}>
        <Box>
          <InfoRow label="Заезд" value={[checkInDate]} inline />
        </Box>
        <Box>
          <InfoRow label="Выезд" value={[checkOutDate]} inline />
        </Box>
      </Box>

      <InfoRow
        label="Тип животного"
        value={
          mapperForValuePetTypeToAnLabel[pet?.type ?? PetDtoType.DOG] || "—"
        }
      />
      <InfoRow label="Кличка" value={pet?.name || "—"} />
      <InfoRow label="Порода" value={pet?.breed || "—"} />
      <InfoRow
        label="Сумма бронирования"
        value={`${Number(bookingSum).toLocaleString("ru-RU")} ₽`}
        bold
      />
    </Paper>
  )
}

const InfoRow: FC<{
  label: string
  value: string | string[]
  bold?: boolean
  inline?: boolean
}> = ({ label, value, bold, inline = false }) => (
  <>
    <Typography fontSize={12} color="text.secondary" mt={1}>
      {label}
    </Typography>
    {inline && Array.isArray(value) ? (
      <Typography fontSize={bold ? 16 : 14} fontWeight={bold ? 700 : 400}>
        {value.join(" ")}
      </Typography>
    ) : (
      <Typography fontSize={bold ? 16 : 14} fontWeight={bold ? 700 : 400}>
        {value}
      </Typography>
    )}
  </>
)
