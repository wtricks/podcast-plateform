import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'

import { auth, db } from '../../firebase'
import { userSelector } from '../../store/user'
import { podcastSelector, changePodcast } from '../../store/profile'
import PodcastContainer from '../../components/PodcastContainer'
import { useAlert } from '../../context/Alert'
import DefaultAvatar from '../../assets/avatar.jpg'
import './style.css'

import { collection, getDocs, query, where } from 'firebase/firestore'

export default function Profile() {
    const show = useAlert()
    const user = useSelector(userSelector);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const podcast = useSelector(podcastSelector)

    const [loading, setLoading] = useState(false);

    const logout = () => {
        signOut(auth)
            .then(() => {
                show("Logout successfully");
            })
            .catch(e => {
                show("An error occured: " + e.message)
            })
    }

    useEffect(() => {
        if (!podcast.length) {
            setLoading(true)
        }
        (async () => {
            const podcastsRef = query(collection(db, 'podcasts'), where('createdBy', '==', auth.currentUser.uid));
            const querySnapshot = await getDocs(podcastsRef);
            const podcasts = [];

            querySnapshot.forEach((doc) => {
                const podcast = {
                    id: doc.id,
                    ...doc.data(),
                    createAt: doc.data().createAt.toDate().toString()
                };
                podcasts.push(podcast);
            });

            dispatch(changePodcast(podcasts))
            setLoading(false)
        })()
    }, [])

    return (
        <div className="container">
            <main>
                <div className="profile-info">
                    <div className="profile-pic">
                        <img src={user.avatar || DefaultAvatar} alt="Anuj Kumar Profile Photo" />
                    </div>

                    <h4>{user.name}</h4>
                    <p>{user.email}</p>

                    <div className="btn-ctrls" style={{ marginTop: '2rem' }}>
                        <button type="button" onClick={() => navigate('/profile/edit')}>Edit</button>
                        <button type="button" className='logout' onClick={logout}>Log out</button>
                    </div>
                </div>

                <h2 style={{ marginTop: '2rem' }}>Podcasts</h2>
                <PodcastContainer
                    podcasts={podcast}
                    loading={loading}
                />
            </main>
        </div>
    )
}