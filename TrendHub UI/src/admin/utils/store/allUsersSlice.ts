import { createSlice } from "@reduxjs/toolkit";



const allUsersSlice=createSlice({
    name:'allUsers',
    initialState:{
        users:[] as unknown[]
    },
    reducers:{
        setUsers:(state,action)=>{
            state.users=[...action.payload]
        }
    }
})


export const{setUsers}=allUsersSlice.actions
export default allUsersSlice.reducer