import { createSlice } from "@reduxjs/toolkit";




const userSlice = createSlice({
    name: 'user',
    initialState: {
        userId:'',
        userName: '',
        isBlocked: '',
        success: false
    },
    reducers: {
        login: (state, action) => {
            const { user, success } = action.payload
            state.userName = user.userName
            state.isBlocked = user.isBlocked
            state.success = success
            state.userId=user._id
        },
        logout: (state) => {
            state.userName = ''
            state.success = false
            state.isBlocked = ''
            state.userId=''
        },
        update: (state,action)=>{
            const {updatedUser, success}= action.payload
            state.userName=updatedUser.userName
            state.isBlocked=updatedUser.isBlocked
            state.success=success
            state.userId=updatedUser._id
        }
    }
})


export const { login, logout, update } = userSlice.actions
export default userSlice.reducer
