import { configureStore } from '@reduxjs/toolkit'
import addSlice from './reducer/addTask'
import userSlice from './reducer/user'

export const store = configureStore({
    reducer :{
        task : addSlice,
        user : userSlice
    }
})