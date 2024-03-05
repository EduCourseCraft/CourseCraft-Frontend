import create from "zustand"

const useDataStore = create((set) => ({
 data: null,

 setData: (data) => set({ data })
}))

export default useDataStore