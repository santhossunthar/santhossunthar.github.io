import React from 'react'
import Card from './Card';

const Project = ({ name, bgimg }) => {
    return (
        <div className="container-fluid">
            <Card
                name={name}
                bgimg={bgimg}
            />
        </div>
    )
}

export default Project
