import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button"
import { StepTitle } from "../../../typography/StepTitle/StepTitle"
import { OwnersSearch } from "../../fields/OwnersSearch/OwnersSearch"
import { CardWithClient } from "@/shared/ui/CardWithClient"
import { CardWithPet } from "@/shared/ui/CardWithPet"
import { PetTag } from "@/shared/ui/PetTag"
import useBookingStore from "@/modules/Booking/store/BookingStore"
import { ShortClientModal } from "../../../modal/ShortClientModal/ShortClientModal"

interface IPetOwnerFormProps {
  isCreateBookingPage?: boolean
}

export const PetOwnerForm = (props: IPetOwnerFormProps) => {
  const { isCreateBookingPage } = props

  const openModal = useBookingStore(state => state.setIsCreateShortClient)

  const handleOpenModal = () => {
    openModal(true)
  }

  const renderBookingModalForm = () => {
    return (
      <div className="flex gap-3 flex-col mt-7">
        <StepTitle title="Шаг 3: Клиент и питомцы" />
        <div className="flex gap-2">
          <OwnersSearch />
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Small}
            fontSize={12}
            fontWeight={600}
            className="w-56"
            onClick={handleOpenModal}
          >
            Создать клиента
          </Button>
        </div>
        <CardWithClient
          fullName="Иванов Иван Иванович"
          mainPhone="8 (999) 999-99-99"
          registrationDate="01.01.2022"
          width="511px"
          tableView
        />
        <PetTag />
        <p className="text-center text-medium mb-5">
          Выберите карточку питомца или <br />{" "}
          <span className="underline text-primaryTextBlue">
            {" "}
            создайте нового
          </span>
        </p>
        <CardWithPet
          breed="Бульдог"
          petName="Шарик"
          petType="Собака"
          width="234px"
          height="244px"
        />
      </div>
    )
  }

  const renderBookingPageForm = () => {
    return (
      <div className="flex gap-3 flex-col mt-7">
        <CardWithClient
          fullName="Иванов Иван Иванович"
          mainPhone="8 (999) 999-99-99"
          registrationDate="01.01.2022"
          width="511px"
          tableView
        />
        <PetTag />
        <p className=" text-center text-medium mb-5 w-full">
          <div>
            <span className="underline text-primaryTextBlue">
              Добавьте питомца из имеющихся{" "}
            </span>{" "}
            <br />
            или
            <span className="underline text-primaryTextBlue">
              {" "}
              создайте нового
            </span>
          </div>
        </p>
      </div>
    )
  }

  return (
    <>
      {isCreateBookingPage ? renderBookingPageForm() : renderBookingModalForm()}
      {<ShortClientModal/>}
    </>
  )
}
