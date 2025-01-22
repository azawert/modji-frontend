import { create } from "zustand"

interface IPetStore {
  isDirty: boolean
  setIsDirty: (value: boolean) => void
}

export const usePetFormStore = create<IPetStore>(set => ({
  isDirty: false,
  setIsDirty: value => set({ isDirty: value }),
}))
