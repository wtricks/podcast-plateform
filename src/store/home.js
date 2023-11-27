import { createSlice } from '@reduxjs/toolkit'

export const Home = createSlice({
    initialState: [],
    name: 'Home',
    reducers: {
        changePodcast(_state, { payload }) {
            return payload
        }
    }
})

export const podcastSelector = state => state.home;
export const { changePodcast } = Home.actions
export default Home.reducer
