import React from 'react';
import CardImg from '../assets/images/profile-picture.png';

const Body = () => {
    return (
        <section className='body'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="card mb-5 shadow-sm">
                            <img src={CardImg} alt="Card Image" className='img-fluid' />

                            <div className="card-body">
                                <div className="card-title">
                                    Project Name
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="card mb-5 shadow-sm">
                            <img src={CardImg} alt="Card Image" className='img-fluid' />

                            <div className="card-body">
                                <div className="card-title">
                                    Project Name
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="card mb-5 shadow-sm">
                            <img src={CardImg} alt="Card Image" className='img-fluid' />

                            <div className="card-body">
                                <div className="card-title">
                                    Project Name
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="card mb-5 shadow-sm">
                            <img src={CardImg} alt="Card Image" className='img-fluid' />

                            <div className="card-body">
                                <div className="card-title">
                                    Project Name
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Body
