import { Link } from 'react-router-dom'
import './style.css'

// eslint-disable-next-line react/prop-types
export default function Card({ src, title, id }) {
    return (
        <div className='podcast-card'>
            <Link to={"/podcast/" + id} className='podcast-link'>
                <div className='image-holder'>
                    <img src={src} alt={title} />
                </div>
                <div className="card-footer">
                    <h5>{title}</h5>

                    <button type="button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="play 1">
                                <path id="Vector" d="M5 3L19 12L5 21V3Z" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                        </svg>
                    </button>
                </div>
            </Link>
        </div>
    )
}