import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'

import { store } from './store'

import Header from './components/Header'
import AuthPage from './pages/Auth'
import HomePage from './pages/Home'
import CreatePodcast from './pages/Start'
import ProfilePage from './pages/Profile'
import ProfileEdit from './pages/Profile/Edit'
import PodcastDetails from './pages/Home/Details'
import PodcastCreateEpisode from './pages/Home/createEpisode'
import PrivateRoute from './pages/PrivateRoute'
import AuthRoute from './pages/PrivateRoute/Auth'


import { AlertProvider } from './context/Alert'
import NotFoundElement from './pages/NotFoundError'
import { useEffect } from 'react'
import { changeUser } from './store/user'
import { auth } from './firebase'

const TempComponent = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            dispatch(changeUser(user ? {
                name: user.displayName,
                email: user.email,
                isVerified: user.emailVerified,
                avatar: user.photoURL,
                id: user.uid
            } : null))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export default function App() {

    return (
        <Provider store={store}>
            <TempComponent />
            <BrowserRouter >
                <Header />
                <AlertProvider>
                    <Routes>
                        <Route element={<AuthRoute />}>
                            <Route Component={AuthPage} path='/auth/:type' />
                        </Route>
                        <Route element={<PrivateRoute />}>
                            <Route Component={HomePage} path='/' />
                            <Route Component={CreatePodcast} path='/create' />

                            <Route Component={ProfilePage} path='/profile' />
                            <Route Component={ProfilePage} path='/profile/:id' />
                            <Route Component={ProfileEdit} path='/profile/edit' />

                            <Route Component={PodcastDetails} path='/podcast/:id' />
                            <Route Component={PodcastCreateEpisode} path='/podcast/:id/create-episode' />
                        </Route>

                        <Route Component={NotFoundElement} path="/*" />
                    </Routes>
                </AlertProvider>
            </BrowserRouter>
        </Provider>
    )
}