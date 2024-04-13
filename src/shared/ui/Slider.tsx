import { Box, Typography, styled } from "@mui/material"
import { memo } from "react"
import MUISlider from "@mui/material/Slider"

/** Типы для маркеров
 * @prop value значение для дальнейшей отправки на бек
 * @prop label лейбл для отображения
 */
export type TMarkerData = {
  value: number
  label: string
}

/** Пропа для компоненты слайдера
 * @prop value значение на котором будет находиться активное состояние слайдера
 * @prop onChange функция обработчик изменения значения в слайдере
 * @prop label текст для отображения над слайдером
 * @prop [markers] отметки снизу слайдера
 * @prop [labelSize] размер лейбла
 * @prop [labelWeight] толщина лейбла
 * @prop [labelPosition] расположение лейбла
 * @prop [isDisabled] флаг для выключенного состояния слайдера
 * @prop [sliderColor] цвет слайдера
 * @prop [step] на сколько шагов может двигаться салйдер
 * @prop [sliderInactiveHeight] размер неактивной части слайдера
 * @prop [maxValue] максимальное значение
 * @prop [minValue] минимальное значение
 */
type TProps = {
  value: number | number[]
  onChange: (value: number | number[]) => void
  label?: string
  markers?: TMarkerData[]
  labelSize?: string
  labelWeight?: string
  labelPosition?: "left" | "center" | "right"
  isDisabled?: boolean
  sliderColor?: string
  step?: number
  sliderInactiveHeight?: number
  maxValue?: number
  minValue?: number
  thumbSize?: number
  sliderHeight?: number
  width?: string
}

export const Slider: React.FC<TProps> = memo(props => {
  const {
    onChange,
    value,
    isDisabled,
    label,
    labelPosition = "left",
    labelSize = 16,
    labelWeight = 400,
    markers,
    sliderColor = "#1170FF",
    step = 1,
    sliderInactiveHeight = 2,
    maxValue,
    minValue,
    thumbSize = 16,
    sliderHeight = 2,
    width = "520px",
  } = props
  const StyledSlider = styled(MUISlider)(() => ({
    color: sliderColor,
    height: sliderInactiveHeight,
    width,
    marginLeft: "15px",
    padding: "15px 0",
    "& .MuiSlider-thumb": {
      height: thumbSize,
      width: thumbSize,
      backgroundColor: "#1170FF",
    },
    "& .MuiSlider-track": {
      border: "none",
      height: sliderHeight,
    },
    "& .MuiSlider-rail": {
      backgroundColor: "#E8E8E8",
    },
    "& .MuiSlider-markLabel": {
      color: "#757575",
    },
    "& .MuiSlider-mark": {
      backgroundColor: "transparent",
    },
  }))

  const minimumValue = minValue ?? markers?.[0].value ?? 0
  const maximumValue = maxValue ?? markers?.[markers.length - 1].value ?? 100

  return (
    <Box sx={{ width }}>
      {label?.length && (
        <Typography
          fontSize={labelSize}
          fontWeight={labelWeight}
          textAlign={labelPosition}
          id={label}
        >
          {label}
        </Typography>
      )}
      <StyledSlider
        valueLabelDisplay="off"
        marks={markers}
        onChange={(_, value) => onChange(value)}
        step={step}
        max={maximumValue}
        min={minimumValue}
        value={value}
        disabled={isDisabled}
        aria-labelledby={label}
        aria-label={label}
      />
    </Box>
  )
})
