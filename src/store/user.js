import { createSlice } from '@reduxjs/toolkit'
export const User = createSlice({
    initialState: null,
    name: 'User',
    reducers: {
        changeUser(_state, { payload }) {
            return payload
        }
    }
})

export const userSelector = state => state.user;
export const { changeUser } = User.actions
export default User.reducer
