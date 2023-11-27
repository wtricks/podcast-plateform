import { configureStore } from '@reduxjs/toolkit'
import User from './user'
import Profile from './profile'
import Home from './home'

export const store = configureStore({
    reducer: {
        user: User,
        profile: Profile,
        home: Home
    },
})