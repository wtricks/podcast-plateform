import Card from '../Card'
import './style.css'

// eslint-disable-next-line react/prop-types
export default function PodcastContainer({ loading, podcasts, errorHeading, errorDescription }) {
    return (
        <div className="podcast-container">
            {
                loading ? (
                    <div className="loader" style={{
                        padding: '2rem',
                        marginTop: '2rem'
                    }}>
                        <span></span>
                    </div>

                    // eslint-disable-next-line react/prop-types
                ) : !podcasts.length && (
                    <div className="no-data-found">
                        <h4>{errorHeading || 'No Podcast found'}</h4>
                        <p>{errorDescription || 'No podcast found, Try to add new podcast now.'}</p>
                    </div>
                )
            }

            {/* eslint-disable-next-line react/prop-types */}
            {podcasts.map((podcast => (
                <Card
                    key={podcast.id}
                    src={podcast.image}
                    title={podcast.title}
                    id={podcast.id}
                />
            )))}
        </div>
    )
}