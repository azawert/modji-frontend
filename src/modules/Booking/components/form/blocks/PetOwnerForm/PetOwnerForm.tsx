import { Button, EButtonSize, EButtonVariant } from "@/shared/ui/Button/Button"
import { StepTitle } from "../../../typography/StepTitle/StepTitle"
import { OwnersSearch } from "../../fields/OwnersSearch/OwnersSearch"
import { CardWithClient } from "@/shared/ui/CardWithClient"
import { CardWithPet } from "@/shared/ui/CardWithPet"
import { PetTag } from "@/shared/ui/PetTag"
import useBookingStore from "@/modules/Booking/store/BookingStore"
import CreateShortClient from "@/modules/Booking/features/createShortClient/CreateShortClient"
import { OwnerDto, PetDtoForOwner } from "@/generated/owners"
import { Icon } from "@/shared/ui/Icon/Icon"
import { IconButton } from "@mui/material"
import { IPet } from "@/modules/Booking/model/types/BookingValidationSchema"
import { DeepPartial, UseFormReturn, useWatch } from "react-hook-form"
import { useState } from "react"
import { PetSelectionModal } from "../../../modal/PetSelectionModal/PetSelectionModal"
import { CreateShortPet } from "../../../modal/ShortPetModal/ShortPetModal"
import { useGetClientById } from "@/modules/Clients/api/queries"

interface IPetOwnerFormProps {
  isCreateBookingPage?: boolean
  form: UseFormReturn<IPet>
  bookingData: DeepPartial<IPet>
}

export const PetOwnerForm = (props: IPetOwnerFormProps) => {
  const { isCreateBookingPage, form, bookingData } = props

  const [isSelectPetOpen, setIsSelectPetOpen] = useState(false)
  const { setValue, watch } = form

  const values = useWatch({ control: form.control })
  const setOwner = useBookingStore(state => state.setOwner)
  const storeOwner = useBookingStore(state => state.owner)
  const setIsOpenShortPetModal = useBookingStore(
    state => state.setIsCreateShortPet
  )
  const setBookingData = useBookingStore(state => state.setBookingData)

  const { data: client } = useGetClientById(Number(storeOwner?.id))

  const owner = storeOwner || client || null
  const petIds = watch("petIds") ?? []

  const availablePets =
    owner?.petsDto?.filter(pet => !petIds.includes(pet.id ?? 0)) ?? []

  const selectedPets =
    owner?.petsDto?.filter(pet => petIds.includes(pet.id ?? 0)) ?? []

  const handleSelectPet = (petId: number) => {
    const updatedPetIds = [...petIds, petId]
    setBookingData({ ...bookingData, ...values, petIds: updatedPetIds })
    setValue("petIds", updatedPetIds)
  }

  const handleRemovePet = (petId: number) => {
    const updatedPetIds = petIds.filter(id => id !== petId)
    setBookingData({ ...bookingData, ...values, petIds: updatedPetIds })
    setValue("petIds", updatedPetIds)
    console.log(bookingData)
  }

  const handleChooseClient = (value: OwnerDto) => {
    setOwner(value)
    if (!bookingData.petIds) return
    setValue("petIds", [...(bookingData.petIds as number[])])
  }

  const openModal = useBookingStore(state => state.setIsCreateShortClient)

  const handleOpenModal = () => openModal(true)

  const handleOpenSelctionModal = () => setIsSelectPetOpen(true)

  const handleOpenCreatePetModal = () => setIsOpenShortPetModal(true)

  const ownerFullName = `${owner?.firstName} ${owner?.lastName ?? ""} ${
    owner?.middleName ?? ""
  }`

  const renderHelperText = () => {
    if (!owner) {
      return <p className="text-center text-medium mb-5">Клиент не выбран</p>
    }
    if (availablePets.length) {
      return (
        <p className="text-center text-medium mb-5">
          <span
            className="underline text-primaryTextBlue cursor-pointer"
            onClick={handleOpenSelctionModal}
          >
            Выберите карточку питомца
          </span>{" "}
          или <br />{" "}
          <span
            className="underline text-primaryTextBlue cursor-pointer"
            onClick={handleOpenCreatePetModal}
          >
            создайте нового
          </span>
        </p>
      )
    } else {
      return (
        <span
          className=" text-center text-medium mb-5 underline text-primaryTextBlue cursor-pointer"
          onClick={handleOpenCreatePetModal}
        >
          Создайте нового питомца
        </span>
      )
    }
  }

  const renderCardWithPet = (
    petsToShow: PetDtoForOwner[],
    selectPet: (id: number) => void
  ) => {
    return (
      <>
        {owner && petsToShow.length !== 0 && (
          <div className="grid grid-cols-2 gap-4 overflow-y-auto overflow-x-hidden h-64 py-3">
            {petsToShow.map(pet => (
              <CardWithPet
                key={pet.id}
                onClick={() => selectPet(pet.id ?? 0)}
                breed={pet.breed ?? "Нет породы"}
                petName={pet.name ?? "Нет клички"}
                petType={pet.type ?? "Собака или кошка?"}
                width="234px"
                height="244px"
              />
            ))}
          </div>
        )}
        {!petsToShow.length && (
          <p className="my-3 mx-auto">Нет доступных питомцев</p>
        )}
      </>
    )
  }

  const renderPetTags = (
    selected: PetDtoForOwner[],
    removePet: (id: number) => void
  ) => {
    return (
      <div className="flex flex-col gap-1">
        {selected.map(pet => (
          <div className="flex gap-2" key={pet.id}>
            <PetTag
              petName={pet.name ?? "Нет клички"}
              petType={pet.type ?? "Собака или кошка?"}
              breed={pet.breed ?? "Нет породы"}
            />
            <IconButton
              onClick={() => removePet(pet.id ?? 0)}
              className="p-0"
              sx={{
                "&.MuiButtonBase-root": {
                  padding: 0,
                },
              }}
            >
              <Icon width="32" height="32" type="DeletePetIcon" />
            </IconButton>
          </div>
        ))}
      </div>
    )
  }

  const renderBookingModalForm = () => {
    return (
      <div className="flex gap-3 flex-col mt-4">
        <StepTitle title="Шаг 3: Клиент и питомцы" />
        <div className="flex gap-2">
          <OwnersSearch onChooseOption={handleChooseClient} />
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Small}
            fontSize={12}
            fontWeight={600}
            className="w-56 h-8"
            onClick={handleOpenModal}
          >
            Создать клиента
          </Button>
        </div>
        {owner && (
          <CardWithClient
            fullName={ownerFullName}
            mainPhone={owner?.mainPhone}
            registrationDate={owner?.registrationDate}
            width="510px"
            tableView
          />
        )}
        {renderPetTags(selectedPets, handleRemovePet)}

        {renderHelperText()}

        {renderCardWithPet(availablePets, handleSelectPet)}
      </div>
    )
  }

  const renderBookingPageForm = () => {
    return (
      <div className="flex gap-3 flex-col mt-7">
        <div className="flex gap-2">
          <OwnersSearch onChooseOption={handleChooseClient} />
          <Button
            variant={EButtonVariant.Secondary}
            size={EButtonSize.Small}
            fontSize={12}
            fontWeight={600}
            className="w-56 h-8"
            onClick={handleOpenModal}
          >
            Создать клиента
          </Button>
        </div>
        {owner && (
          <CardWithClient
            fullName={ownerFullName}
            mainPhone={owner?.mainPhone}
            registrationDate={owner?.registrationDate}
            width="510px"
            tableView
          />
        )}
        {renderPetTags(selectedPets, handleRemovePet)}

        {renderHelperText()}

        <PetSelectionModal
          isOpen={isSelectPetOpen}
          onClose={() => setIsSelectPetOpen(false)}
        >
          {renderPetTags(selectedPets, handleRemovePet)}
          {renderCardWithPet(availablePets, handleSelectPet)}
        </PetSelectionModal>
      </div>
    )
  }

  return (
    <>
      {isCreateBookingPage ? renderBookingPageForm() : renderBookingModalForm()}
      <CreateShortClient />
      <CreateShortPet />
    </>
  )
}
