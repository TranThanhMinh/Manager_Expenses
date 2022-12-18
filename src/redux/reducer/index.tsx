import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { danangReducer } from '../reducer/danang';

const reducers = combineReducers({
  danang:danangReducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck:false
  })
})

//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;

