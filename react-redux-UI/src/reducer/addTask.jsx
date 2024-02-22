import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios' 

const initialState = {
    loading : false,
    task : [],
    err : ''
}

export const addTask = createAsyncThunk ('task/addTask',()=>{
    return axios
    .post('http://localhost:8000/task')
    .then (response =>response.data)    
})


const addSlice = createSlice({
    name: 'task',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.loading = false;
                state.task = action.payload;
            })
            .addCase(addTask.rejected, (state, action) => {
                state.loading = false;
                state.err = 'error';
            });
    },
});

export default addSlice.reducer