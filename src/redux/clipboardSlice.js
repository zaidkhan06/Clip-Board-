import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const clipboardSlice = createSlice({
  name: "clipboard",
  initialState,
  reducers: {
    addTopastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created sucessfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload
      const index = state.pastes.findIndex((item) => item.id === paste._id)

      if(index >= 0) {
        state.pastes[index] = paste
        localStorage.setItem("pastes", JSON.stringify(state.pastes))
        toast.success("Paste Updated")
      }
    },
    resetAllPastes: (state, action) => {
      state.pastes = [];
      localStorage.removeItem("pastes")
      toast.success("Paste reset successfully")
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      console.log(pasteId);
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if(index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTopastes, updateToPastes, resetAllPastes, removeFromPastes } =
  clipboardSlice.actions;

export default clipboardSlice.reducer;
