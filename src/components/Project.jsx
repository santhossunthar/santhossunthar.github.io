import React from 'react'
import Card from './Card';

const Project = ({ name, bgimg }) => {
    return (
        <div className="container-fluid align-items-center"
            style={{
                background: `linear-gradient(
                        0deg,rgba(255, 255, 255, 0.5) 0%,
                        rgba(255, 255, 255, 0.2) 48%,
                        rgba(255, 255, 255, 0.2) 77%,
                        rgba(236, 252, 255, 0.5) 100%), 
                        url(/images/${bgimg}) no-repeat`,
                backgroundSize: 'cover'
            }}
        >
            <Card 
            name={name} 
            bgimg={bgimg} />
        </div>
    )
}

export default Project
