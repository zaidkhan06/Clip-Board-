import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  : []
}

export const clipboardSlice = createSlice({
  name: 'clipboard',
  initialState,
  reducers: {
    addTopastes: (state, action) => {
      
      
    },
    updateToPastes: (state, action) => {
      
    },
    resetAllPastes: (state, action) => {
      
    },

    removeFromPastes: (state, action) => {

    },
  },
})

// Action creators are generated for each case reducer function
export const { addTopastes, updateToPastes, resetAllPastes, removeFromPastes } = clipboardSlice.actions

export default clipboardSlice.reducer