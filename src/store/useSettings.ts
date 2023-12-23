import { doc, getDoc, setDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { db } from '../firebase/connection-db'

const INITIAL_STATE = {
  amount_limit: 0
}

interface Settings {
  amount_limit: number
}

interface SettingsState {
  settings: Settings
  getSettings: ({ userName }: { userName: string }) => Promise<void>
  updateSettings: ({ userName, settings }: { userName: string, settings: Settings }) => Promise<void>
}

const useSettingsStore = create<SettingsState>()((set) => ({
  settings: INITIAL_STATE,
  getSettings: async ({ userName }: { userName: string }) => {
    await getDoc(doc(db, userName, 'settings'))
      .then((response) => {
        set({ settings: { ...response?.data() as Settings } })
      })
  },
  updateSettings: async ({ userName, settings }: { userName: string, settings: Settings }) => {
    await setDoc(doc(db, userName, 'settings'), {
      amount_limit: settings.amount_limit
    })
  }
}))

export default useSettingsStore
