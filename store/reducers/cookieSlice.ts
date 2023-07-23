import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isAuth: false,
    cookie: ''
}  
const cookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.isAuth = true;
            state.cookie = action.payload.cookieValue;
        },
        logout: (state) => {
            state.isAuth = false;
            state.cookie = '';
        },
    }
})

export const { loginSuccess, logout } = cookieSlice.actions
export default cookieSlice.reducer