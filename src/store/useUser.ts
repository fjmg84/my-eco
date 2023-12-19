import { create } from 'zustand'

interface UserState {
  userName: string
}

const useUserStore = create<UserState>()((set) => ({
  userName: 'fjmgqba@gmail.com'
}))

export default useUserStore
