import { create } from 'zustand'
// @ts-nocheck
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware'

const useAuthStore = create()((devtools(persist
  (subscribeWithSelector((set) => ({

    accessToken: null,
    storeAuthToken: (token: any) => set((state: any) => {
      return {
        accessToken: token
      }
    }),

  })), {
    name: 'zustand',
  }))))

export default useAuthStore
