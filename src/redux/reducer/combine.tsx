// import { combineReducers } from 'redux';
// import { danangReducer } from '../reducer/danang';

// const reducers = combineReducers({
// comments: danangReducer
// });

// export default reducers;
// //This RootState is required to use useSelector later on 
// export type RootState = ReturnType<typeof reducers>;


import { combineReducers } from 'redux';
import { danangReducer } from '../reducer/danang';

const reducers = combineReducers({
    danang: danangReducer
});

export default reducers;
//This RootState is required to use useSelector later on 
export type RootState = ReturnType<typeof reducers>;