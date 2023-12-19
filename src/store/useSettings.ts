import { doc, getDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { db } from '../firebase/connection-db'

interface Settings {
  limit_amount: number
}

interface SettingsState {
  settings: Settings | undefined
  getSettings: ({ username }: { username: string }) => Promise<void>
}

const useSettingsStore = create<SettingsState>()((set) => ({
  settings: undefined,
  getSettings: async ({ username }: { username: string }) => {
    await getDoc(doc(db, 'shopping', username, 'settings', 'default'))
      .then((response) => {
        set({ settings: { ...response?.data() as Settings } })
      })
  }
}))

export default useSettingsStore
