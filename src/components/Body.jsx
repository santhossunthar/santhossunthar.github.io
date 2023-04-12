import React from 'react';

const Body = () => {
    return (
        <section className='body'>
            <div className="container-fluid align-items-center">
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src={require('../assets/images/sql.png')} alt="Card Image" className='img-fluid' />

                    <div className="card-body">
                        <div className="card-title">
                            Project Name
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid align-items-center">
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src={require('../assets/images/sql.png')} alt="Card Image" className='img-fluid' />

                    <div className="card-body">
                        <div className="card-title">
                            Project Name
                        </div>
                    </div>

                </div>
            </div>

            <div className="container-fluid align-items-center">
                <div className="card mb-5 mt-5 shadow-sm">
                    <img src={require('../assets/images/sql.png')} alt="Card Image" className='img-fluid' />

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
