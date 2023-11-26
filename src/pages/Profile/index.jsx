import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'

import { auth } from '../../firebase'
import { userSelector } from '../../store/user'
import PodcastContainer from '../../components/PodcastContainer'
import { useAlert } from '../../context/Alert'
import DefaultAvatar from '../../assets/avatar.jpg'
import './style.css'

import { dummyHomePodcast } from '../../constants/dummy-data'

export default function Home() {
    const show = useAlert()
    const user = useSelector(userSelector);
    const navigate = useNavigate()

    const logout = () => {
        signOut(auth)
            .then(() => {
                show("Logout successfully");
            })
            .catch(e => {
                show("An error occured: " + e.message)
            })
    }

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
                    podcasts={dummyHomePodcast}
                />
            </main>
        </div>
    )
}