import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, getDocs, getDoc, doc } from 'firebase/firestore'

import { auth, db } from '../../firebase'
import AudioPlayer from '../../components/Player'
import "./style.css"

export default function Details() {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    const [podcast, setPodcast] = useState({})
    const [episode, setEpisode] = useState([])
    const [active, setActive] = useState(-1)

    const playNextAudio = () => {
        setActive(active == episode.length - 1 ? 0 : active + 1)
    }

    const playPrevAudio = () => {
        setActive(active == 0 ? episode.length - 1 : active - 1)
    }

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDoc(doc(db, 'podcasts', id));
            setPodcast({
                id: querySnapshot.id,
                ...querySnapshot.data(),
                createdAt: querySnapshot.data().createAt.toDate().toString()
            })
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const querySnapshot = await getDocs(collection(db, 'podcasts', id, 'episodes'));
            const episodes = [];

            querySnapshot.forEach(doc => {
                episodes.push({
                    id: doc.id,
                    ...doc.data(),
                    createAt: doc.data().createAt.toDate().toString()
                })
            })

            setEpisode(episodes)
            setLoading(false);
        })()
    }, [])

    return (
        <div className="container">
            <main className="detail-page">
                {podcast.title && (
                    <>
                        <div className="top">
                            <h2>{podcast.title}</h2>
                            {podcast.createdBy == auth.currentUser.uid && (
                                <button type="button" onClick={() => navigate("/podcast/" + id + "/create-episode")}>Create Episode</button>
                            )}
                        </div>

                        <div className="banner">
                            <img src={podcast.bannerImage} alt={podcast.title} />
                        </div>

                        <p className="desc">
                            {podcast.description}
                        </p>

                        <h2>Episodes</h2>
                    </>
                )}

                {loading || (
                    <div className="episodes">
                        {episode.length ? (
                            <ul>
                                {episode.map((e, i) => {
                                    return <li key={e.id}>
                                        <h4>{e.title}</h4>
                                        <p className="desc">{e.description}</p>

                                        <button type='button' onClick={() => setActive(i)}>
                                            Play
                                        </button>
                                    </li>
                                })}
                            </ul>
                        ) : (
                            <>
                                <h4 className="no-h">No episode found</h4>
                                <p className="no-p">This podcast has no episode, if you are owner of this podcast try to create an episode.</p>
                            </>
                        )}
                    </div>
                )}

                {(!podcast.title || loading) && (
                    <div className='loader' style={{ width: '100%', justifyContent: 'center', display: 'flex', marginTop: '3rem' }}>
                        <span></span>
                    </div>
                )}
            </main>

            {loading || active == -1 || (
                <AudioPlayer
                    onNext={playNextAudio}
                    onPrev={playPrevAudio}
                    song={episode[active].audio}
                    title={episode[active].title}
                />
            )}
        </div>
    )
}
