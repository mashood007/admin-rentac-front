import { create } from 'zustand'
// @ts-nocheck
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

const useUserStore = create()((devtools(persist
  (subscribeWithSelector((set) => ({
    currentUser: {},
    storeUser: (user: any) => set((state: any) => {
      return {
        currentUser: user
      }
    }),

    accessToken: null,
    storeAuthToken: (token: any) => set((state: any) => {
      return {
        accessToken: token
      }
    }),
  })), {
    name: 'zustand',
  }))))

export default useUserStore
