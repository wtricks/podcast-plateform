import { useEffect, useState, useMemo } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../firebase'
import { changePodcast, podcastSelector } from '../../store/home'
import Form from '../../components/Form'
import PodcastContainer from '../../components/PodcastContainer'

import './style.css'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const podcast = useSelector(podcastSelector)
    const dispatch = useDispatch()

    const getPodcast = useMemo(() => {
        const regex = new RegExp(search, 'i')
        return podcast.filter(e => regex.test(e.title));
    }, [podcast, search])

    useEffect(() => {
        if (!podcast.length) {
            setLoading(true)
        }

        (async () => {
            const querySnapshot = await getDocs(collection(db, 'podcasts'));
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
                <h2 style={{ fontSize: "1.2rem" }}>Discover Podcast</h2>

                <Form
                    action="/podcast/search"
                    method="get"
                    onSubmit={e => setSearch(e.search)}
                    data={[{ props: { placeholder: 'Search...' }, name: 'search' }]}
                    style={{ maxWidth: '700px', width: '100%' }}
                />

                <PodcastContainer
                    loading={loading}
                    podcasts={getPodcast}
                />
            </main>
        </div>
    )
}