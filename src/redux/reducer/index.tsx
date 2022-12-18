// import { combineReducers } from 'redux'
// import { configureStore } from '@reduxjs/toolkit'
// import danangReducer from "./danang";

// const reducers = combineReducers({
//    danangReducer
// })

// export const store = configureStore({
//   reducer: reducers,
//   middleware: getDefaultMiddleware => getDefaultMiddleware({
//     serializableCheck:false
//   })
// })


//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;


import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducer/combine';

export const store = createStore(reducers, {}, applyMiddleware(thunk));