interface PetTagProps {
  breed: string
  petType: string
  petName: string
}

export const PetTag = (props: PetTagProps) => {
  const { breed, petType, petName } = props
  return (
    <div className="bg-basicBlack text-white text-small px-4 py-2 rounded-24px font-medium inline-block w-fit ">
      Питомец: {petName}, {petType}, {breed}
    </div>
  )
}
