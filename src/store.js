import { configureStore } from '@reduxjs/toolkit'
import ClipboardSlice  from './redux/clipboardSlice'

export const store = configureStore({
  reducer: {
    clipboard: ClipboardSlice,
  },
})