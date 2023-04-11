import { useState, useEffect } from 'react';
import PagesBody from './PagesBody';

const NavBar = () => {
    const [state, setState] = useState('');
    const [status, setStatus] = useState('');
    useEffect(() => { window.scrollTo(0, 0) }, [])

    return (
        <div className='container'>
            <div className="container navbar">
                <ul className="nav nav-tabs">
                    <li className={"nav-item "}>
                        <a className="nav-link" onClick={() => { setState('About'); setStatus('active') }}>About</a>
                    </li>
                    <li className={"nav-item " + status}>
                        <a className="nav-link" onClick={() => { setState('Projects'); setActiveClassStatus() }}>Projects</a>
                    </li>
                    <li className={"nav-item " + status}>
                        <a className="nav-link" onClick={() => { setState('Contact'); setStatus('active') }}>Contact</a>
                    </li>
                </ul>
            </div>

            <div className="container">
                <PagesBody page={state} />
            </div>
        </div>
    )
}

export default NavBar