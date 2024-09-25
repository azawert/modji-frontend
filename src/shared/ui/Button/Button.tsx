import { ButtonBase, CircularProgress, Typography } from "@mui/material"
import React, { useMemo, forwardRef, CSSProperties } from "react"
import { COLORS } from "../../constants/colors"
import { TIcon } from "@/assets/Icons/types"
import { Icon } from "../Icon/Icon"
import { cn } from "@/lib/utils"

type TFontWeight = 400 | 500 | 600 | 700
type TFontSize = 12 | 14 | 16

export enum EButtonSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export enum EButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Link = "link",
}

/**
 * @prop size размер кнопки (попытался настроить под все кнопки которые есть в дизайне)
 * @prop variant вариант кнопки (нашел два варианта в дизайне)
 * @prop [leftIcon] иконка для отображения слева в кнопке
 * @prop [rightIcon] иконка для отображения справа в кнопке
 * @prop [fontWeight] размер шрифта для текста в кнопке
 * @prop [fontSize] размер шрифта для текста в кнопке
 * @prop [isDisabled] флаг для отображения отключенного состояния кнопки
 * @prop [isLoading] флаг для отображения состояния загрузки
 * @prop [loadingSpinner] иконка отображения состояния загрузки
 */
type TProps = {
  size: EButtonSize
  variant: EButtonVariant
  leftIcon?: TIcon
  rightIcon?: TIcon
  fontWeight?: TFontWeight
  fontSize?: TFontSize
  isDisabled?: boolean
  isLoading?: boolean
  loadingSpinner?: React.ReactNode
} & React.PropsWithChildren &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">

export const Button = forwardRef<HTMLButtonElement, TProps>((props, ref) => {
  const {
    children,
    size,
    variant,
    leftIcon,
    rightIcon,
    fontWeight,
    fontSize,
    isDisabled,
    isLoading,
    type,
    ...rest
  } = props
  const buttonSizeStyles = useMemo<CSSProperties>(() => {
    switch (size) {
      case EButtonSize.Small:
        return { padding: "7px 16px 7px 16px", borderRadius: "21px" }
      case EButtonSize.Medium:
        return { padding: "12px 32px", borderRadius: "26px" }
      case EButtonSize.Large:
        return { padding: "14px 44px", borderRadius: "26px" }
      default:
        return {}
    }
  }, [size])

  const buttonVariantStyles = useMemo<CSSProperties>(() => {
    switch (variant) {
      case EButtonVariant.Primary:
        return {
          color: COLORS.white,
          backgroundColor: COLORS.primaryBlue,
          border: "none",
        }
      case EButtonVariant.Secondary:
        return {
          color: COLORS.basicBlack,
          backgroundColor: COLORS.white,
          border: `1px solid ${COLORS.darkGrey}`,
        }
      case EButtonVariant.Link:
        return {}
    }
  }, [variant])

  const buttonWithIconStyles = useMemo<CSSProperties>(() => {
    if (leftIcon || rightIcon) {
      return {
        display: "flex",
        alignItems: "center",
      }
    }
    return {}
  }, [leftIcon, rightIcon])
  return (
    <ButtonBase
      ref={ref}
      sx={{
        ...buttonSizeStyles,
        ...buttonVariantStyles,
        ...buttonWithIconStyles,
      }}
      className={cn({
        ["bg-basicGrey text-basicGreyText"]: isDisabled,
        ["hover:bg-calmBlue active:bg-brightBlue"]:
          variant === EButtonVariant.Primary,
        ["active:border-[#2422F1] active:text-[#2422F1] hover:border-[#585858] hover:text-[#585858]"]:
          variant === EButtonVariant.Secondary,
        ["border-0 text-sm text-[#757575]"]: variant === EButtonVariant.Link,
      })}
      type={type}
      disabled={isDisabled}
      {...rest}
    >
      {!isLoading && leftIcon && <Icon type={leftIcon} />}
      {isLoading && (
        <CircularProgress
          color={variant === EButtonVariant.Primary ? "inherit" : "primary"}
          size={20}
          sx={{ marginRight: "5px" }}
        />
      )}
      <Typography fontWeight={fontWeight ?? 400} fontSize={fontSize ?? 12}>
        {children}
      </Typography>
      {rightIcon && <Icon type={rightIcon} />}
    </ButtonBase>
  )
})
