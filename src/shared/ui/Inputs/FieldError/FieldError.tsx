export const FieldError = ({ error }: { error: string }) => {
  return <div className="text-error font-semibold text-small h-2">{error}</div>
}
