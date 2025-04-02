import { create } from "zustand"

interface IPetStore {
  isDirty: boolean
  dirtyFields: { [key: string]: boolean }
  setDirtyFields: (value: {}) => void
  setIsDirty: (value: boolean) => void
}

export const usePetFormStore = create<IPetStore>(set => ({
  isDirty: false,
  dirtyFields: {},
  setIsDirty: value => set({ isDirty: value }),
  setDirtyFields: value => set({ dirtyFields: value }),
}))
