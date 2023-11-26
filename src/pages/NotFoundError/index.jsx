import { useNavigate } from 'react-router-dom'

export default function ErrorElement() {
    const navigate = useNavigate()

    return (
        <main>
            <h2 style={{ fontSize: '2rem', marginTop: '4rem' }}>404 Not Found</h2>
            <p>The Page you are looking for, is not found</p>

            <button type="button" onClick={() => navigate('/', { replace: true })}>Go to Main Page</button>
        </main>
    )
}