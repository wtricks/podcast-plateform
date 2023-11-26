import Form from '../../components/Form'
import PodcastContainer from '../../components/PodcastContainer'

import { dummyHomePodcast } from '../../constants/dummy-data'
import './style.css'

export default function Home() {
    return (
        <div className="container">
            <main>
                <h2 style={{ fontSize: "1.2rem" }}>Discover Podcast</h2>

                <Form
                    action="/podcast/search"
                    method="get"
                    data={[{ props: { placeholder: 'Search...' }, name: 'search' }]}
                    style={{ maxWidth: '700px', width: '100%' }}
                />

                <PodcastContainer
                    loading={false}
                    podcasts={dummyHomePodcast}
                />
            </main>
        </div>
    )
}