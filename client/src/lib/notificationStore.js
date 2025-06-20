import { create } from 'zustand'
import apiRequest from "./apiRequest";


export const useNotificationStore = create((set) => ({
  number: 0,
  fetch: async () => {
    const res = await apiRequest("/users/notification")
    set({number: res.data.number})
  },
  decrease: () => {set(p => {
    return ({number: (p.number > 0 ? p.number - 1 : 0)})
  })
    },
  increase: () => {set(p => {
      return ({number: (p.number + 1)})
    })
      },
    reset: () => {
        set({number: 0})
    }
}))
