import { NavLink } from 'react-router-dom'
import './style.css'

export default function Header() {
    return (
        <header className="header">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/auth/signup" className={({ isActive }) => isActive ? 'active' : ''}>
                            Sign up
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
                            Podcasts
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/create" className={({ isActive }) => isActive ? 'active' : ''}>
                            Start a podcast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
                            Profile
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}