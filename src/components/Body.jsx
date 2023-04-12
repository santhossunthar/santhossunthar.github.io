import React from 'react';

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
                        url(/images/sql.png) no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src="/images/sql.png" alt="Card Image" className='img img-fluid' />

                    <div className="card-body">
                        <div className="card-title">
                            Project Name
                        </div>
                    </div>

                </div>
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
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src="/images/tableau.png" alt="Card Image" className='img img-fluid' />

                    <div className="card-body">
                        <div className="card-title">
                            Project Name
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid align-items-center"
                style={{
                    background: `linear-gradient(
                    0deg,rgba(255, 255, 255, 0.5) 0%,
                    rgba(255, 255, 255, 0.2) 48%,
                    rgba(255, 255, 255, 0.2) 77%,
                    rgba(236, 252, 255, 0.5) 100%), 
                    url(/images/sql.png) no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src="/images/sql.png" alt="Card Image" className='img img-fluid' />

                    <div className="card-body">
                        <div className="card-title">
                            Project Name
                        </div>       
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Body
