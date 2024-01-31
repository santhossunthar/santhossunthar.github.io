import React from 'react'
import Card from './Card';

const Project = ({ name, bgimg, url }) => {
    return (
        <div className="container mb-5">
            <Card
                name={name}
                bgimg={bgimg}
                url={url}
            />
        </div>
    )
}

export default Project
