import { createSlice } from '@reduxjs/toolkit'

export const Profile = createSlice({
    initialState: [],
    name: 'Profile',
    reducers: {
        changePodcast(_state, { payload }) {
            return payload
        }
    }
})

export const podcastSelector = state => state.profile;
export const { changePodcast } = Profile.actions
export default Profile.reducer
