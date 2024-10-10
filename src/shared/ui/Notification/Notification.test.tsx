import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { Notification } from "./Notification"
import { ENotificationType } from "@/contexts/notificationContext/NotificationContext"
import { DATA_TEST_ID_GLOBAL_OBJECT } from "@/shared/constants/test-id"
import { eventEmitter } from "@/shared/utils/eventEmitter"

const {
  notification: { success, error },
} = DATA_TEST_ID_GLOBAL_OBJECT

const confirmButtonText = "Подтверждаю"
const cancelButtonText = "Продолжить заполнение"

jest.mock("@/contexts/notificationContext/useNotificationContext", () => ({
  useNotification: jest.fn(),
}))

describe("Notification Component", () => {
  let mockRemoveNotification: jest.SpyInstance

  beforeEach(() => {
    mockRemoveNotification = jest
      .spyOn(eventEmitter, "emit")
      .mockImplementation(() => {})
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("Проверка на базовый рендер компонента", () => {
    render(
      <Notification
        id="1"
        type={ENotificationType.SUCCESS}
        title="Success Title"
        text="This is a success notification"
        isOpened={true}
      />
    )

    expect(screen.getByText("Success Title")).toBeInTheDocument()
    expect(
      screen.getByText("This is a success notification")
    ).toBeInTheDocument()
  })

  it("Проверка на правильность успешной иконки", () => {
    render(
      <Notification
        id="2"
        type={ENotificationType.SUCCESS}
        text="Success notification"
        isOpened={true}
      />
    )

    const successIcon = screen.getByTestId(success)
    expect(successIcon).toBeInTheDocument()
  })

  it("Проверка на правильность отображения иконки с ошибкой", () => {
    render(
      <Notification
        id="3"
        type={ENotificationType.ERROR}
        text="Error notification"
        isOpened={true}
      />
    )

    const errorIcon = screen.getByTestId(error)
    expect(errorIcon).toBeInTheDocument()
  })

  it("Обработчик закрытия вызывается при клике", () => {
    render(
      <Notification
        id="4"
        type={ENotificationType.WARNING}
        text="Warning notification"
        isOpened={true}
      />
    )

    const closeButton = screen.getByRole("button")
    fireEvent.click(closeButton)

    expect(mockRemoveNotification).toHaveBeenCalledWith(
      "removeNotification",
      "4"
    )
  })

  it("Автоматическое закрытие нотификации", async () => {
    render(
      <Notification
        id="5"
        type={ENotificationType.SUCCESS}
        text="Auto close notification"
        isOpened={true}
        isAutoClosable={true}
        timeout={1000}
      />
    )

    expect(screen.getByText("Auto close notification")).toBeInTheDocument()

    await waitFor(
      () => {
        expect(mockRemoveNotification).toHaveBeenCalledWith(
          "removeNotification",
          "5"
        )
      },
      { timeout: 1500 }
    )
  })

  it("Автоматическое закрытие не происходит", async () => {
    render(
      <Notification
        id="6"
        type={ENotificationType.SUCCESS}
        text="Manual close notification"
        isOpened={true}
        isAutoClosable={false}
      />
    )

    expect(screen.getByText("Manual close notification")).toBeInTheDocument()

    await waitFor(
      () => {
        expect(mockRemoveNotification).not.toHaveBeenCalled()
      },
      { timeout: 1500 }
    )
  })

  it("Кнопки отображаются при типе confirmation", () => {
    render(
      <Notification
        id="7"
        type={ENotificationType.CONFIRMATION}
        text="Confirmation notification"
        isOpened={true}
        withConfirmationButtons={true}
        confirmButtonText={confirmButtonText}
        cancelButtonText={cancelButtonText}
      />
    )

    expect(screen.getByText(confirmButtonText)).toBeInTheDocument()
    expect(screen.getByText(cancelButtonText)).toBeInTheDocument()
  })
})
