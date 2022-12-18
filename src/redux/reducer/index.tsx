import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import danangReducer from "../reducer/danang";

const reducers = combineReducers({
   danangReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck:false
  })
})