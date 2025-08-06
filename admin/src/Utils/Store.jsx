import { create } from 'zustand'

export const useUserStore = create((set, get) => ({
    //STATE
    userInfo: undefined,
    selectedOption: "dashboard",
    client: undefined,
    land: undefined,

    //ACTIONS
    setUserInfo: (userInfo) => set({userInfo}),
    setSelectedOption: (selectedOption) => set({selectedOption}),
    setClient: (client) => set({client}),
    setLand: (land) => set({land})
}))