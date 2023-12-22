import { doc, getDoc, setDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { db } from '../firebase/connection-db'

interface Settings {
  limit_amount: number
}

interface SettingsState {
  settings: Settings
  getSettings: ({ username }: { username: string }) => Promise<void>
  updateSettings: ({ username, settings }: { username: string, settings: Settings }) => Promise<void>
}

const useSettingsStore = create<SettingsState>()((set) => ({
  settings: {
    limit_amount: 0
  },
  getSettings: async ({ username }: { username: string }) => {
    await getDoc(doc(db, 'shopping', username, 'settings', 'default'))
      .then((response) => {
        set({ settings: { ...response?.data() as Settings } })
      })
  },
  updateSettings: async ({ username, settings }: { username: string, settings: Settings }) => {
    await setDoc(doc(db, 'shopping', username, 'settings', 'default'), {
      limit_amount: settings.limit_amount
    })
  }
}))

export default useSettingsStore
