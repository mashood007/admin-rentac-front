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
	})), {
		name: 'zustand',
	}))))

export default useUserStore
