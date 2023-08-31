import { createSlice } from "@reduxjs/toolkit";



const adminSlice= createSlice({
    name:'admin',
    initialState:{
        success:''
    },
    reducers:{
        login:(state,action)=>{
            const { success}=action.payload
            state.success=success
        },
        logout:(state)=>{
            state.success=''
        }
    }
})


export const {login,logout}=adminSlice.actions
export default adminSlice.reducer