interface ILabel {
  label: string
  isRequired?: boolean
}
export const Label: React.FC<ILabel> = ({ label, isRequired }) => {
  return (
    <div className="mb-1 text-sm text-basicGreyText active:border-basicBlack text-small">
      {label}
      <span className="font-semibold ml-0.5 text-basicGreyText ">
        {isRequired ? "*" : ""}
      </span>
    </div>
  )
}
