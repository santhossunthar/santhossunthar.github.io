import React from 'react'
import Card from './Card';

const Project = ({ name, bgimg, url }) => {
    return (
        <div className="container-fluid">
            <Card
                name={name}
                bgimg={bgimg}
                url={url}
            />
        </div>
    )
}

export default Project
