import { render, screen, fireEvent } from "@testing-library/react"
import { Button, EButtonSize, EButtonVariant } from "./Button"

describe("Компонент кнопки", () => {
  it("Рендерится с корректным текстом", () => {
    render(
      <Button size={EButtonSize.Medium} variant={EButtonVariant.Primary}>
        Click Me
      </Button>
    )
    expect(screen.getByText("Click Me")).toBeInTheDocument()
  })

  it("Применяет нужные стили кнопки", () => {
    render(
      <Button size={EButtonSize.Small} variant={EButtonVariant.Primary}>
        Small Button
      </Button>
    )
    const button = screen.getByText("Small Button").closest("button")
    expect(button).toHaveStyle("padding: 7px 16px 7px 16px")
    expect(button).toHaveStyle("border-radius: 21px")
  })

  it("Применяет нужные стили при другом варианте", () => {
    render(
      <Button size={EButtonSize.Medium} variant={EButtonVariant.Secondary}>
        Secondary Button
      </Button>
    )
    const button = screen.getByText("Secondary Button").closest("button")
    expect(button).toHaveStyle("color: #181A1A")
    expect(button).toHaveStyle("background-color: #ffffff")
    expect(button).toHaveStyle("border: 1px solid #585858")
  })

  it("Рендерит левую иконку", () => {
    render(
      <Button
        size={EButtonSize.Medium}
        variant={EButtonVariant.Primary}
        leftIcon="CategoryIcon"
      >
        Button with Icon
      </Button>
    )
    expect(
      screen.getByText("Button with Icon").previousSibling
    ).toBeInTheDocument()
  })

  it("Рендерит правую иконку", () => {
    render(
      <Button
        size={EButtonSize.Medium}
        variant={EButtonVariant.Primary}
        rightIcon="DeleteIcon"
      >
        Button with Icon
      </Button>
    )
    expect(screen.getByText("Button with Icon").nextSibling).toBeInTheDocument()
  })

  it("Показывает спиннер при загрузке", () => {
    render(
      <Button
        size={EButtonSize.Medium}
        variant={EButtonVariant.Primary}
        isLoading
      >
        Loading Button
      </Button>
    )
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("Отключена при пропе isDisabled", () => {
    render(
      <Button
        size={EButtonSize.Medium}
        variant={EButtonVariant.Primary}
        isDisabled
      >
        Disabled Button
      </Button>
    )
    const button = screen.getByText("Disabled Button").closest("button")
    expect(button).toBeDisabled()
  })

  it("Вызывает обработчик при клике", () => {
    const handleClick = jest.fn()
    render(
      <Button
        size={EButtonSize.Medium}
        variant={EButtonVariant.Primary}
        onClick={handleClick}
      >
        Clickable Button
      </Button>
    )
    const button = screen.getByText("Clickable Button")
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
