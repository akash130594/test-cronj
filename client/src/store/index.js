import { combineReducers, configureStore, createReducer } from '@reduxjs/toolkit'
import { tasks } from './reducer';

const reducers = combineReducers({
    tasks
})

export default configureStore({
    reducer: reducers,
})