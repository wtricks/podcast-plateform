import { useNavigate, useParams } from 'react-router-dom'
import Image from '../../assets/ae74941c3eecdc36b0d21e6056eccdaf.png'
import AudioPlayer from '../../components/Player'
import "./style.css"

export default function Details() {
    const navigate = useNavigate()
    const { id } = useParams()

    return (
        <div className="container">
            <main className="detail-page">
                <div className="top">
                    <h2>Podcast Title</h2>
                    <button type="button" onClick={() => navigate("/podcast/" + id + "/create-episode")}>Create Episode</button>
                </div>

                <div className="banner">
                    <img src={Image} alt="Banner Image" />
                </div>

                <p className="desc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>

                <h2>Episodes</h2>

                <div className="episodes">
                    <ul>
                        <li>
                            <h4>Episodes 1</h4>
                            <p className="desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
                            </p>

                            <button type='button' onClick={() => { }}>
                                Play
                            </button>
                        </li>
                        <li>
                            <h4>Episodes 1</h4>
                            <p className="desc">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure.
                            </p>

                            <button type='button' onClick={() => { }}>
                                Play
                            </button>
                        </li>
                    </ul>
                </div>
            </main>

            <AudioPlayer />
        </div>
    )
}