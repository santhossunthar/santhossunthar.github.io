import React from 'react';
import Card from './Card';

const Body = () => {
    return (
        <section className='body'>
            <div className="container-fluid align-items-center"
                style={{
                    background: `linear-gradient(
                        0deg,rgba(255, 255, 255, 0.5) 0%,
                        rgba(255, 255, 255, 0.2) 48%,
                        rgba(255, 255, 255, 0.2) 77%,
                        rgba(236, 252, 255, 0.5) 100%), 
                        url(/images/sql.jpg) no-repeat`,
                    backgroundSize: 'cover'
                }}
            >
                <Card imgName="sql.jpg" projectName="SQL Project" />
            </div>

            <div className="container-fluid align-items-center"
                style={{
                    background: `linear-gradient(
                    0deg,rgba(255, 255, 255, 0.5) 0%,
                    rgba(255, 255, 255, 0.2) 48%,
                    rgba(255, 255, 255, 0.2) 77%,
                    rgba(236, 252, 255, 0.5) 100%), 
                    url(/images/tableau.png) no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <Card imgName="sql.jpg" projectName="SQL Project" />
            </div>

            <div className="container-fluid align-items-center"
                style={{
                    background: `linear-gradient(
                    0deg,rgba(255, 255, 255, 0.5) 0%,
                    rgba(255, 255, 255, 0.2) 48%,
                    rgba(255, 255, 255, 0.2) 77%,
                    rgba(236, 252, 255, 0.5) 100%), 
                    url(/images/python.jpg) no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <Card imgName="sql.jpg" projectName="SQL Project" />
            </div>
        </section>
    )
}

export default Body
